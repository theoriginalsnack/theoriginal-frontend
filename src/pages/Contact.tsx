import { usePageMeta } from '../usePageMeta';
import ContactPageClient from '../components/ContactPageClient';

export default function ContactPage() {
  usePageMeta(
    'Contact Us',
    'Contact The Original Cashews in Palasa. Direct phone & WhatsApp: +91 9100267404, email: theoriginalcashews@gmail.com, address: 13/1/76 Tilak Nagar, Kasibugga, Palasa 532222 with Google Maps location.',
  );
  return <ContactPageClient />;
}
