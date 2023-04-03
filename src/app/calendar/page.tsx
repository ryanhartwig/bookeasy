import { Header } from '@/components/Header';
import { getAllAppointments } from '@/utility/functions/fetch/getAllAppointments';
import { getAllClients } from '@/utility/functions/fetch/getAllClients';
import { getAllServices } from '@/utility/functions/fetch/getAllServices';
import { getClient } from '@/utility/functions/getClient';
import { CalendarView } from './calendar';

export interface View {        
  month: number,
  year: number,
}

export default async function Page() {
  const { data: appointments} = await getAllAppointments('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { data: services } = await getAllServices('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { data: clients } = await getAllClients('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');

  return (
    <>
      <Header text='Calendar' />
      <CalendarView appointments={appointments} services={services} clients={clients} />
    </>
  )
}