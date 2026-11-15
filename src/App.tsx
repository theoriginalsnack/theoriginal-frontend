import { useEffect, type ComponentType } from 'react';
import { createBrowserRouter, Navigate, Outlet, RouterProvider, ScrollRestoration } from 'react-router';
import ScrollRevealProvider from './components/ScrollRevealProvider';
import { ShopProvider, useShop } from './context/ShopContext';
import { AuthProvider } from './context/AuthContext';
import GlobalCartDrawer from './components/GlobalCartDrawer';
import LoginModal from './components/LoginModal';
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// Scroll positions: in-app navigation uses React Router's per-entry keys. Full page loads all share the
// key "default" (as do plain #anchor jumps), so we key those by path + hash, and only reload / back-forward should restore them; a fresh
// visit (typed URL, external link) always starts at the top.
const SCROLL_STORAGE_KEY = 'to-scroll-positions';
const scrollKey = (location: { key: string; pathname: string; hash: string }) =>
  location.key === 'default' ? location.pathname + location.hash : location.key;

const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined;
if (navEntry?.type === 'navigate') {
  try {
    const saved = JSON.parse(sessionStorage.getItem(SCROLL_STORAGE_KEY) ?? '{}') as Record<string, number>;
    delete saved[window.location.pathname];
    sessionStorage.setItem(SCROLL_STORAGE_KEY, JSON.stringify(saved));
  } catch {
    /* storage unavailable: nothing to forget */
  }
}

// Each page loads as its own chunk on first visit.
const page = (load: () => Promise<{ default: ComponentType }>) => async () => ({
  Component: (await load()).default,
});

// Smooth-scroll same-page "#id" links (Back to top, #reviews, ...). Global CSS smooth scrolling
// would also animate every route change, so it's done here instead.
function SmoothHashLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const link = (e.target as Element | null)?.closest('a[href^="#"]');
      const id = link?.getAttribute('href')?.slice(1);
      const target = id ? document.getElementById(id) : null;
      if (!target) return;
      e.preventDefault();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      target.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
      window.history.replaceState(window.history.state, '', `#${id}`);
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, []);
  return null;
}

function GlobalToast() {
  const { toastMessage } = useShop();
  return (
    <div aria-live="polite" role="status">
      {toastMessage && (
        <div className="shop-toast global-toast">
          <span className="global-toast-icon" aria-hidden="true">!</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

function RootLayout() {
  return (
    <AuthProvider>
      <ShopProvider>
        <ScrollRevealProvider>
          <SmoothHashLinks />
          <ScrollRestoration storageKey={SCROLL_STORAGE_KEY} getKey={scrollKey} />
          <Outlet />
          <GlobalCartDrawer />
          <LoginModal />
          <GlobalToast />
        </ScrollRevealProvider>
      </ShopProvider>
    </AuthProvider>
  );
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    hydrateFallbackElement: <></>, // blank for the few ms a lazy page chunk loads on first visit
    children: [
      { path: '/', element: <Home /> },
      { path: '/about', lazy: page(() => import('./pages/About')) },
      { path: '/cart', lazy: page(() => import('./pages/Cart')) },
      { path: '/checkout', lazy: page(() => import('./pages/Checkout')) },
      { path: '/contact', lazy: page(() => import('./pages/Contact')) },
      { path: '/gifting', lazy: page(() => import('./pages/Gifting')) },
      { path: '/privacy-policy', lazy: page(() => import('./pages/PrivacyPolicy')) },
      { path: '/products', lazy: page(() => import('./pages/Products')) },
      { path: '/products/:id', lazy: page(() => import('./pages/ProductDetail')) },
      { path: '/profile', lazy: page(() => import('./pages/Profile')) },
      { path: '/refund-policy', lazy: page(() => import('./pages/RefundPolicy')) },
      { path: '/shipping-policy', lazy: page(() => import('./pages/ShippingPolicy')) },
      { path: '/terms-conditions', lazy: page(() => import('./pages/TermsConditions')) },
      { path: '/wallet', lazy: page(() => import('./pages/Wallet')) },
      { path: '/wishlist', element: <Navigate to="/products" replace /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
