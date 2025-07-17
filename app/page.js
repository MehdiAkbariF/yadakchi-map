// دیگر نیازی به next/dynamic نیست
import NeshanMap from '@/components/map/NeshanMap';
import UserProfileAddressManager from '@/components/map/UserProfileAddressManager';
export default function HomePage() {
  // کلید API سرویس خود را اینجا قرار دهید
  const NESHAN_API_KEY = 'service.2f5e358472a54de98d13b8c976c32110';

  return (
   <UserProfileAddressManager/>
  );
}