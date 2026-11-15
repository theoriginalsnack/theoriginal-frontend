import { createContext, useContext, useReducer, useEffect, useRef, useState, useCallback, type ReactNode } from 'react';
import { ORDERS_OPEN, ORDERS_PAUSED_MESSAGE } from '../config';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  size: string;
  price: number;
  mrp: number;
  image: string;
  quantity: number;
  grade?: string;
  isCustomCombo?: boolean;
  comboItems?: { name: string; size: string; price: number }[];
}

interface ShopState {
  cart: CartItem[];
}

type ShopAction =
  | { type: 'CART_ADD'; item: CartItem }
  | { type: 'CART_REMOVE'; id: string }
  | { type: 'CART_UPDATE_QTY'; id: string; qty: number }
  | { type: 'CART_CLEAR' };

// ─── Reducer ──────────────────────────────────────────────────────────────────
function shopReducer(state: ShopState, action: ShopAction): ShopState {
  switch (action.type) {
    case 'CART_ADD': {
      const { item } = action;
      const existing = state.cart.find((c) => c.id === item.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((c) =>
            c.id === item.id ? { ...c, quantity: c.quantity + (item.quantity || 1) } : c
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...item, quantity: item.quantity || 1 }] };
    }

    case 'CART_REMOVE':
      return { ...state, cart: state.cart.filter((c) => c.id !== action.id) };

    case 'CART_UPDATE_QTY':
      return {
        ...state,
        cart: state.cart.map((c) =>
          c.id === action.id ? { ...c, quantity: Math.max(1, action.qty) } : c
        ),
      };

    case 'CART_CLEAR':
      return { ...state, cart: [] };

    default:
      return state;
  }
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw === null ? fallback : (JSON.parse(raw) as T);
  } catch {
    return fallback;
  }
}

interface ShopContextValue {
  cart: CartItem[];
  cartCount: number;
  cartTotal: number;
  /** Returns false (and shows the paused toast) while orders are closed. */
  addToCart: (item: CartItem, openDrawer?: boolean) => boolean;
  /** Call before any buy/order action; returns false and shows a toast while orders are closed. */
  guardOrder: () => boolean;
  toastMessage: string;
  showToast: (message: string) => void;
  removeFromCart: (id: string) => void;
  updateCartQty: (id: string, qty: number) => void;
  clearCart: () => void;
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const ShopContext = createContext<ShopContextValue | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  // Lazy initializers read localStorage once on first render.
  const [state, dispatch] = useReducer(shopReducer, undefined, () => ({
    cart: readJson<CartItem[]>('to_cart', []),
  }));

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('to_cart', JSON.stringify(state.cart));
    } catch { /* ignore */ }
  }, [state.cart]);

  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const openCartDrawer = useCallback(() => setIsCartDrawerOpen(true), []);
  const closeCartDrawer = useCallback(() => setIsCartDrawerOpen(false), []);

  // ── Global toast ────────────────────────────────────────────────
  const [toastMessage, setToastMessage] = useState('');
  const toastTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const showToast = useCallback((message: string) => {
    clearTimeout(toastTimer.current);
    setToastMessage(message);
    toastTimer.current = setTimeout(() => setToastMessage(''), 3500);
  }, []);
  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const guardOrder = useCallback(() => {
    if (ORDERS_OPEN) return true;
    showToast(ORDERS_PAUSED_MESSAGE);
    return false;
  }, [showToast]);

  // ── Cart helpers ────────────────────────────────────────────────
  const addToCart = useCallback((item: CartItem, openDrawer = true) => {
    if (!guardOrder()) return false;
    dispatch({ type: 'CART_ADD', item });
    if (openDrawer) {
      // Don't pop drawer over /cart or /checkout pages
      const path = window.location.pathname;
      if (!path.startsWith('/cart') && !path.startsWith('/checkout')) {
        setIsCartDrawerOpen(true);
      }
    }
    return true;
  }, [guardOrder]);

  const removeFromCart = useCallback((id: string) => dispatch({ type: 'CART_REMOVE', id }), []);
  const updateCartQty = useCallback((id: string, qty: number) => dispatch({ type: 'CART_UPDATE_QTY', id, qty }), []);
  const clearCart = useCallback(() => dispatch({ type: 'CART_CLEAR' }), []);

  // ── Computed ────────────────────────────────────────────────────
  const cartCount = state.cart.reduce((sum, c) => sum + c.quantity, 0);
  const cartTotal = state.cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  return (
    <ShopContext.Provider
      value={{
        cart: state.cart,
        cartCount,
        cartTotal,
        addToCart,
        removeFromCart,
        updateCartQty,
        clearCart,
        isCartDrawerOpen,
        openCartDrawer,
        closeCartDrawer,
        guardOrder,
        toastMessage,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components -- hook co-located with its provider
export function useShop() {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error('useShop must be used inside ShopProvider');
  return ctx;
}
