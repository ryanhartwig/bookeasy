import { Header } from '@/components/Header';
import { getAllAppointments } from '@/utility/functions/fetch/getAllAppointments';
import { getAllBusinesses } from '@/utility/functions/fetch/getAllBusinesses';
import { getAllClients } from '@/utility/functions/fetch/getAllClients';
import { getAllServices } from '@/utility/functions/fetch/getAllServices';
import { ClientsView } from './clientsView';

export default async function Page() {

  const { data: clients } = await getAllClients('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { data: businesses } = await getAllBusinesses('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { data: appointments } = await getAllAppointments('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { data: services } = await getAllServices('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');

  console.log(clients);
  return (
    <>
      <Header text='Clients' />
      <ClientsView clients={clients} businesses={businesses} appointments={appointments} services={services} />
    </>
  )
}