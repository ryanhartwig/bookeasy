import { Header } from '@/components/Header';
import { userId } from '@/utility/sample_data/sample_userId';
import { CalendarView } from './calendar';

export interface View {        
  month: number,
  year: number,
}

export default async function Page() {

  return (
    <>
      <Header text='Calendar' />
      <CalendarView userId={userId}/>
    </>
  )
}