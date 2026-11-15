import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import { REDEEM_THRESHOLD, WELCOME_COINS, coinsToRupees } from '../data/coins';

export interface User {
  name: string;
  phone: string;
  email: string;
  isFirstLogin: boolean;
}

export interface Transaction {
  id: string;
  orderId: string;
  title: string;
  desc: string;
  type: 'credit' | 'debit';
  amount: number;
  status: string;
  date: string;
}

type Credentials = string | Partial<Pick<User, 'name' | 'phone' | 'email'>>;

interface AuthContextValue {
  user: User | null;
  isLoggedIn: boolean;
  login: (credentials: Credentials, fallbackName?: string) => void;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
  isLoginModalOpen: boolean;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  // Wallet (only meaningful while signed in; guests always have 0)
  coins: number;
  coinsValue: number;
  canRedeemCoins: boolean;
  coinsNeededForRedeem: number;
  progressPercent: number;
  transactions: Transaction[];
  addCoins: (amount: number, orderId: string, title?: string) => void;
  spendCoins: (amount: number, orderId: string, title: string, desc: string) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const today = () =>
  new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

function readCoins(): number {
  const n = Number(localStorage.getItem('to_coins'));
  return Number.isFinite(n) && n > 0 ? n : 0;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  // Lazy initializers read localStorage once on first render.
  const [user, setUser] = useState<User | null>(() => readJson<User | null>('to_user', null));
  const [coins, setCoins] = useState(() => (user ? readCoins() : 0));
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    user ? readJson<Transaction[]>('to_transactions', []) : [],
  );
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Persist the wallet while signed in
  useEffect(() => {
    if (!user) return;
    try {
      localStorage.setItem('to_coins', String(coins));
      localStorage.setItem('to_transactions', JSON.stringify(transactions));
    } catch { /* ignore */ }
  }, [coins, transactions, user]);

  const login = useCallback((credentials: Credentials, fallbackName = '') => {
    let email = '';
    let phone = '';
    let name: string;

    if (typeof credentials === 'string') {
      if (credentials.includes('@')) {
        email = credentials;
      } else {
        phone = credentials;
      }
      name = fallbackName;
    } else {
      email = credentials.email || '';
      phone = credentials.phone || '';
      name = credentials.name || '';
    }

    if (!name) {
      if (email) {
        const raw = email.split('@')[0].replace(/[._-]/g, ' ');
        name = raw.charAt(0).toUpperCase() + raw.slice(1);
      } else if (phone) {
        name = `User ${phone.slice(-4)}`;
      } else {
        name = 'The Original Member';
      }
    }

    const isNew = !localStorage.getItem('to_user');
    const userData: User = { name, phone, email, isFirstLogin: isNew };
    setUser(userData);
    try { localStorage.setItem('to_user', JSON.stringify(userData)); } catch { /* ignore */ }

    if (isNew) {
      setCoins(WELCOME_COINS);
      setTransactions([
        {
          id: 'TXN-WLC-01',
          orderId: 'WELCOME',
          title: 'Welcome Bonus',
          desc: `${WELCOME_COINS} Original Coins credited on first sign-in`,
          type: 'credit',
          amount: WELCOME_COINS,
          status: 'Credited',
          date: today(),
        },
      ]);
    } else {
      setCoins(readCoins());
      setTransactions(readJson<Transaction[]>('to_transactions', []));
    }
    setIsLoginModalOpen(false);
  }, []);

  const updateProfile = useCallback((updates: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return prev;
      const updated = { ...prev, ...updates };
      try { localStorage.setItem('to_user', JSON.stringify(updated)); } catch { /* ignore */ }
      return updated;
    });
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setCoins(0);
    setTransactions([]);
    try {
      localStorage.removeItem('to_user');
      localStorage.removeItem('to_coins');
      localStorage.removeItem('to_transactions');
    } catch { /* ignore */ }
  }, []);

  const addCoins = useCallback((amount: number, orderId: string, title = `Order #${orderId} Reward`) => {
    if (amount <= 0) return;
    setCoins((prev) => prev + amount);
    setTransactions((prev) => [
      {
        id: `TXN-${Date.now()}`,
        orderId,
        title,
        desc: `${amount} Original Coins credited`,
        type: 'credit',
        amount,
        status: 'Credited',
        date: today(),
      },
      ...prev,
    ]);
  }, []);

  const spendCoins = useCallback(
    (amount: number, orderId: string, title: string, desc: string) => {
      if (amount <= 0 || coins < amount) return false;
      setCoins((prev) => prev - amount);
      setTransactions((prev) => [
        {
          id: `TXN-${Date.now()}-D`,
          orderId,
          title,
          desc,
          type: 'debit',
          amount: -amount,
          status: 'Redeemed',
          date: today(),
        },
        ...prev,
      ]);
      return true;
    },
    [coins],
  );

  const openLoginModal = useCallback(() => setIsLoginModalOpen(true), []);
  const closeLoginModal = useCallback(() => setIsLoginModalOpen(false), []);

  return (
    <AuthContext.Provider value={{
      user,
      isLoggedIn: !!user,
      login,
      logout,
      updateProfile,
      isLoginModalOpen,
      openLoginModal,
      closeLoginModal,
      coins,
      coinsValue: coinsToRupees(coins),
      canRedeemCoins: coins >= REDEEM_THRESHOLD,
      coinsNeededForRedeem: Math.max(0, REDEEM_THRESHOLD - coins),
      progressPercent: Math.min(100, Math.round((coins / REDEEM_THRESHOLD) * 100)),
      transactions,
      addCoins,
      spendCoins,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
