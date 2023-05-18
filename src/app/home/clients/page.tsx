import { Header } from '@/components/Header';
import { userId } from '@/utility/sample_data/sample_userId';
import { ClientsView } from './clientsView';

export default function Page() {

  return (
    <>
      <Header text='Clients' />
      <ClientsView userId={userId} />
    </>
  )
}