'use client';

import styles from './calendar.module.scss';
import { Appointment } from "@/types/Appointment"
import { Calendar, months } from '@/components/calendar/Calendar';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { ReactIconButton } from '@/components/UI/IconButton/ReactIconButton';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Daily } from './daily';
import { getMonthRange } from '@/utility/functions/getMonthRange';
import { useCalendarNavigation } from '@/utility/hooks/useCalendarNavigation';
import { useEffect, useMemo, useState } from 'react';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';

interface CalendarProps {
  appointments: Appointment[],
  services: Service[],
  clients: Client[],
}

export const CalendarView: React.FC<CalendarProps> = ({appointments, services, clients}) => {
  const { onMonthSwitch, onReset, startDate, selected, viewing, onSelect } = useCalendarNavigation();
  const [start, end] = useMemo(() => getMonthRange(new Date(startDate).setMonth(viewing.month)), [startDate, viewing.month]);

  const [servicesMap, setServicesMap] = useState(() => new Map<string, Service>());
  const [clientsMap, setClientsMap] = useState(() => new Map<string, Client>());

  useEffect(() => {
    const sMap = new Map<string, Service>();
    const cMap = new Map<string, Client>();

    services.forEach(s => sMap.set(s.id, s));
    clients.forEach(c => cMap.set(c.id, c));

    setServicesMap(sMap);
    setClientsMap(cMap);
  }, [clients, services]);

  const selectedMonthAppointments = useMemo<Appointment[]>(() => appointments
    .filter(app => app.startDate >= start && app.startDate <= end)
    .sort((a, b) => a.startDate - b.startDate)
  , [appointments, end, start]);
  const selectedDayAppointments = useMemo(() => appointments.filter(app => app.startDate >= selected[0] && app.startDate <= selected[1]), [appointments, selected]);

  return (
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
        <Daily day={selected[0]} appointments={selectedDayAppointments} services={servicesMap} clients={clientsMap} />
        <Calendar appointments={selectedMonthAppointments} selected={selected} onSelect={onSelect} startDate={startDate} viewing={viewing} clients={clientsMap} services={servicesMap} />
      </div>
    </div>
  )
}