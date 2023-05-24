import { Header } from '@/components/Header';
import { CalendarView } from '../calendar';

export default function Page() {
  return (
    <>
      <Header text='Calendar' />
      <CalendarView />
    </>
  )
}