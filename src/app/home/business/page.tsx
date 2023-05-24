import { Header } from '@/components/Header';
import { BusinessView } from './businessView';

export default function Page() {
  return (
    <>
      <Header text='My Business' />
      <BusinessView />
    </>
  );
}