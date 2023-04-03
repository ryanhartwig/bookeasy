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
  const services = await getAllServices('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const clients = await getAllClients('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');

  // const appointments = useMemo<Appointment[]>(() => {
  //   if (!data || loading) return []; 
  //   return data.user.appointments.edges
  //     .map((app: any) => parseToAppointment(app.node, 'user_01GWHJK2PJ3C1DGYJY32YSJFQ3'))
  //     .filter((app: Appointment) => app.startDate >= start && app.startDate <= end)
  //     .sort((a: Appointment, b: Appointment) => a.startDate - b.startDate);
  // }, [data, end, loading, start]);

  return (
    <>
      <Header text='Calendar' />
      <CalendarView appointments={appointments} />
    </>
  )
}