import { Header } from '@/components/Header';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { CalendarView } from './calendar';

export interface View {        
  month: number,
  year: number,
}

export default async function Page() {

  const session = await getServerSession(authOptions);
  if (!session) return;

  return (
    <>
      <Header text='Calendar' />
      <CalendarView userId={session.user.id}/>
    </>
  )
}