import { usePageMeta } from '../usePageMeta';
import ProfilePageClient from '../components/ProfilePageClient';

export default function ProfilePage() {
  usePageMeta(
    'My Profile',
    'Manage your account, view order history, and track your Original Coins.',
  );
  return <ProfilePageClient />;
}
