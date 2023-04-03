import { Header } from '@/components/Header';
import { getAllClients } from '@/utility/functions/fetch/getAllClients';
import { ClientsView } from './clientsView';

export default async function Page() {

  const { data: clients } = await getAllClients('user_01GWHJK2PJ3C1DGYJY32YSJFQ3')
  
  return (
    <>
      <Header text='Clients' />
      <ClientsView clients={clients} />
    </>
  )
}