import { usePageMeta } from '../usePageMeta';
import CheckoutPageClient from '../components/CheckoutPageClient';

export default function CheckoutPage() {
  usePageMeta(
    'Checkout',
    'Complete your order from The Original Palasa Cashews.',
  );
  return <CheckoutPageClient />;
}
