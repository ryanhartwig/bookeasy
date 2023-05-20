'use client';
import { useUser } from '@/app/Providers';
import { Header } from '@/components/Header';
import { CalendarView } from './calendar';

export interface View {        
  month: number,
  year: number,
}

export default function Page() {
  const { id } = useUser();
  return (
    <>
      <Header text='Calendar' />
      <CalendarView userId={id}/>
    </>
  )
}