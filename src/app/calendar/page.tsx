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

export interface View {        
  month: number,
  year: number,
}

export default function Page() {
  const today = new Date();
  const initDate = new Date();
  initDate.setDate(1);
  initDate.setDate(initDate.getDay() * -1);

  const [selected, setSelected] = useState<[number, number]>(getDayRange());

  // On selecting day
  const onSelect = useCallback(([min, max]: [number, number]) => {
    setSelected([min, max]);
  }, []);

  // First date to show on the top left most cell of the calendar
  const [startDate, setStartDate] = useState<Date>(initDate);

  // Month currently selected / viewing
  const [viewing, setViewing] = useState<View>({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  useEffect(() => {
    const selectedDate = new Date(selected[0]);
    if (viewing.month === selectedDate.getMonth()) return;

    setViewing({
      month: selectedDate.getMonth(),
      year: selectedDate.getFullYear(),
    });
    selectedDate.setDate(1);
    selectedDate.setDate(selectedDate.getDay() * -1);

    setStartDate(selectedDate);
  }, [selected, viewing.month]);

  // Increment / decrement month
  const onMonthSwitch = useCallback((n: number) => {
    const newDate = new Date(startDate);

    newDate.setMonth(newDate.getMonth() + n);
    
    setViewing({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })

    newDate.setDate(1);
    const selectedDate = new Date(newDate);
    newDate.setDate(newDate.getDay() * -1);

    setStartDate(newDate);

    if (n === 2) {
      setSelected(getDayRange(selectedDate));
    }
    if (n === 0) {
      selectedDate.setMonth(selectedDate.getMonth() + 1);
      selectedDate.setDate(1);
      selectedDate.setDate(selectedDate.getDate() - 1);
      setSelected(getDayRange(selectedDate));
    }
  }, [startDate]);

  const [min, max] = getDayRange(new Date());
  const reset = useCallback(() => {
    const td = new Date();
    const init = new Date();
    init.setDate(1);
    init.setDate(init.getDay() * -1);
    
    setViewing({
      month: td.getMonth(),
      year: td.getFullYear(),
    });
    setStartDate(init);
    onSelect && onSelect([min, max]);
  }, [max, min, onSelect]);

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
    .filter(app => app.start_date >= start && app.start_date <= end)
    .sort((a, b) => a.start_date - b.start_date)
  );

  const dayApps = useMemo(() => appointments.filter(app => app.start_date >= selected[0] && app.start_date <= selected[1]), [appointments, selected]);

  useEffect(() => {
    setAppointments(sample_appointments
      .filter(app => app.start_date >= start && app.start_date <= end)
      .sort((a, b) => a.start_date - b.start_date)
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
              <p onClick={reset}>Today</p>
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