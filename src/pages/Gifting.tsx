import { usePageMeta } from '../usePageMeta';
import GiftingPageClient from '../components/GiftingPageClient';

export default function GiftingPage() {
  usePageMeta(
    'Luxury Gifting & Corporate Hampers',
    'Curated luxury cashew hampers, executive gift boxes, and wedding favors from The Original. Hand selected Jumbo King calibers, custom monograms, and pan India delivery.',
  );
  return <GiftingPageClient />;
}
