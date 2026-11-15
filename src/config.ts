// Store-wide switches.
// Orders stay paused until the deploy sets VITE_ORDERS_OPEN=true (e.g. in Vercel env vars).
export const ORDERS_OPEN = import.meta.env.VITE_ORDERS_OPEN === 'true';
export const ORDERS_PAUSED_MESSAGE = 'We are currently not accepting orders. We will be back soon!';
