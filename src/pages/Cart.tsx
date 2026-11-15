import { usePageMeta } from '../usePageMeta';
import CartPageClient from '../components/CartPageClient';

export default function CartPage() {
  usePageMeta(
    'Your Cart',
    'Review your selected cashews before checkout.',
  );
  return <CartPageClient />;
}
