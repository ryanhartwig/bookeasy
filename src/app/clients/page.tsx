import { Header } from '@/components/Header';
import { getAllBusinesses } from '@/utility/functions/fetch/getAllBusinesses';
import { getAllClients } from '@/utility/functions/fetch/getAllClients';
import { ClientsView } from './clientsView';

export default async function Page() {

  const { data: clients } = await getAllClients('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { data: businesses} = await getAllBusinesses('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');

  console.log(businesses);
  
  return (
    <>
      <Header text='Clients' />
      <ClientsView clients={clients} />
    </>
  )
}