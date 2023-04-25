import { Header } from '@/components/Header';
import { getAllAppointments } from '@/utility/functions/fetch_old/getAllAppointments';
import { getAllClients } from '@/utility/functions/fetch_old/getAllClients';
import { getAllServices } from '@/utility/functions/fetch_old/getAllServices';
import { getClient } from '@/utility/functions/getClient';
import { userId } from '@/utility/sample_data/sample_userId';
import { CalendarView } from './calendar';

export interface View {        
  month: number,
  year: number,
}

export default async function Page() {
  const { data: appointments} = await getAllAppointments(userId);
  const { data: services } = await getAllServices(userId);
  const { data: clients } = await getAllClients(userId);

  return (
    <>
      <Header text='Calendar' />
      <CalendarView appointments={appointments} services={services} clients={clients} />
    </>
  )
}