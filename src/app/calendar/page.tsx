'use client';

import styles from './calendar.module.scss';

import { SecondaryHeader } from "@/components/SecondaryHeader"
import { Calendar, months } from '@/components/calendar/Calendar';
import { useState, useCallback, useEffect, useMemo } from 'react';
import { getDayRange } from '@/utility/functions/getDayRange';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Daily } from './daily';
import { Appointment } from '@/types/Appointment';
import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_services } from '@/utility/sample_data/sample_services';
import { ReactIconButton } from '@/components/UI/IconButton/ReactIconButton';
import { Header } from '@/components/Header';
import { useCalendarNavigation } from '@/utility/hooks/useCalendarNavigation';

export interface View {        
  month: number,
  year: number,
}

export default function Page() {

  const { onMonthSwitch, onReset, startDate, selected, viewing, onSelect } = useCalendarNavigation();
  
  const [start, end] = useMemo<[number, number]>(() => {
    const startEnd = new Date(startDate);
    startEnd.setDate(startEnd.getDate() + 1);
    const [start] = getDayRange(startEnd);

    startEnd.setDate(startEnd.getDate() + 41);
    const [_, end] = getDayRange(startEnd);

    return [start, end];
  }, [startDate]);

  // This will be fetched & revalidated on updates, and will only include appointments for the current month
  const [appointments, setAppointments] = useState<Appointment[]>(sample_appointments
    .filter(app => app.startDate >= start && app.startDate <= end)
    .sort((a, b) => a.startDate - b.startDate)
  );

  const dayApps = useMemo(() => appointments.filter(app => app.startDate >= selected[0] && app.startDate <= selected[1]), [appointments, selected]);

  useEffect(() => {
    setAppointments(sample_appointments
      .filter(app => app.startDate >= start && app.startDate <= end)
      .sort((a, b) => a.startDate - b.startDate)
    );
  }, [end, start, startDate]);

  const services = useMemo(() => new Map<string, Service>(), []);
  const clients = useMemo(() => new Map<string, Client>(), []);
  
  useEffect(() => {
    sample_services.forEach(s => services.set(s.id, s));
    sample_clients.forEach(c => clients.set(c.id, c));
  }, [clients, services]);
  
  return (
    <>
      <Header text='Calendar' />
      <div className={styles.calendar}>
        <SecondaryHeader>
          {/* Year/Month Select */}
          <div className='Calendar-period noselect'>
            <div className='Calendar-period-month'>
              <ReactIconButton buttonSize='30px' onClick={() => onMonthSwitch(0)} style={{borderRadius: '12px'}}>
                <AiOutlineLeft size={15}/>
              </ReactIconButton> 
              <h2>{months[viewing.month]}</h2>

              <ReactIconButton buttonSize='30px' onClick={() => onMonthSwitch(2)} style={{borderRadius: '12px'}}>
                <AiOutlineRight size={15}/>
              </ReactIconButton>
            </div>
            <div className='Calendar-reset'>
              <h2>{viewing.year}</h2>
              <p onClick={onReset}>Today</p>
            </div>
          </div>
        </SecondaryHeader>
        <div className={styles.content}>
          <Daily day={selected[0]} appointments={dayApps} services={services} clients={clients} />
          <Calendar appointments={appointments} selected={selected} onSelect={onSelect} startDate={startDate} viewing={viewing} clients={clients} services={services} />
        </div>
      </div>
    </>
  )
}