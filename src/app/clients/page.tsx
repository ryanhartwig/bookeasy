import { Header } from '@/components/Header';
import { getAllAppointments } from '@/utility/functions/fetch_old/getAllAppointments';
import { getAllBusinesses } from '@/utility/functions/fetch_old/getAllBusinesses';
import { getAllClients } from '@/utility/functions/fetch_old/getAllClients';
import { getAllServices } from '@/utility/functions/fetch_old/getAllServices';
import { userId } from '@/utility/sample_data/sample_userId';
import { ClientsView } from './clientsView';

export default async function Page() {

  const { data: clients } = await getAllClients(userId);
  const { data: businesses } = await getAllBusinesses(userId);
  const { data: appointments } = await getAllAppointments(userId);
  const { data: services } = await getAllServices(userId);

  return (
    <>
      <Header text='Clients' />
      <ClientsView clients={clients} businesses={businesses} appointments={appointments} services={services} />
    </>
  )
}