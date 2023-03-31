'use client';

import styles from './calendar.module.scss';

import { SecondaryHeader } from "@/components/SecondaryHeader"
import { Calendar, months } from '@/components/calendar/Calendar';
import { useState, useEffect, useMemo } from 'react';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Daily } from './daily';
import { Appointment } from '@/types/Appointment';
import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { ReactIconButton } from '@/components/UI/IconButton/ReactIconButton';
import { Header } from '@/components/Header';
import { useCalendarNavigation } from '@/utility/hooks/useCalendarNavigation';
import { getMonthRange } from '@/utility/functions/getMonthRange';
import { useQuery } from '@apollo/client';
import { query } from '@/utility/functions/fetch/getAllAppointments';
import { getClient } from '@/utility/functions/getClient';

export interface View {        
  month: number,
  year: number,
}

export default function Page() {
  
  const { onMonthSwitch, onReset, startDate, selected, viewing, onSelect } = useCalendarNavigation();
  
  const [start, end] = useMemo(() => getMonthRange(new Date(startDate).setMonth(viewing.month)), [startDate, viewing.month]);

  
  const client = getClient();
  const {data, loading } = useQuery(query, {
    client,
    variables: {
      after: "",
      id: "user_01GWHJK2PJ3C1DGYJY32YSJFQ3"
    }
  });

  useEffect(() => {
    if (!data || loading) return; 
    console.log(data);
  }, [data, loading]);

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

  const [servicesMap, setServicesMap] = useState(() => new Map<string, Service>());
  const [clientsMap, setClientsMap] = useState(() => new Map<string, Client>());

  // use apollo fetch hook =)
  
  
  // useEffect(() => {
  //   console.log(clients);

  //   const sMap = new Map<string, Service>();
  //   const cMap = new Map<string, Client>();

  //   services.forEach(s => sMap.set(s.id, s));
  //   clients.forEach(c => cMap.set(c.id, c));

  //   setServicesMap(sMap);
  //   setClientsMap(cMap);
  // }, [data]);
  
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
          <Daily day={selected[0]} appointments={dayApps} services={servicesMap} clients={clientsMap} />
          <Calendar appointments={appointments} selected={selected} onSelect={onSelect} startDate={startDate} viewing={viewing} clients={clientsMap} services={servicesMap} />
        </div>
      </div>
    </>
  )
}