import { usePageMeta } from '../usePageMeta';
import WalletPageClient from '../components/WalletPageClient';

export default function WalletPage() {
  usePageMeta(
    'Original Coins Wallet',
    'Track your Original Coins balance, rewards value, and order transaction history.',
  );
  return <WalletPageClient />;
}
