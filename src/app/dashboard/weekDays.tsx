'use client';

import styles from './weekly_overview.module.scss';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Hours } from './hours';
import { useOptimizedResize } from '@/utility/hooks/useOptimizedResize';
import { getCurrentWeek } from '@/utility/functions/getCurrentWeek';
import { getDayRange } from '@/utility/functions/getDayRange';

import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { Appointment } from '@/types/Appointment';

interface WeekDaysProps {
  appointments: Appointment[],
  services: Service[],
  clients: Client[],
}

export const WeekDays: React.FC<WeekDaysProps> = ({appointments, services, clients}) => {

  const days = Array(7).fill(true);
  const hourlyRef = useRef<HTMLDivElement>(undefined!);

  const [width, setWidth] = useState<string>('auto');
  const [start] = getCurrentWeek();

  const servicesMap = useMemo(() => new Map<string, Service>(), []);
  const clientsMap = useMemo(() => new Map<string, Client>(), []);
  
  const wrapperRef = useRef<HTMLDivElement>(undefined!);
  const wrapperWidth = useOptimizedResize(wrapperRef, '100%');

  useEffect(() => {
    setWidth(`calc(100% + ${hourlyRef.current.offsetWidth - hourlyRef.current.clientWidth}px)`)
  }, []);

  useEffect(() => {
    services.forEach(s => servicesMap.set(s.id, s));
    clients.forEach(c => clientsMap.set(c.id, c));
  }, [clients, clientsMap, services, servicesMap]);
  
  return (
    <div className={styles.hourlywrapper} ref={wrapperRef} style={{width: wrapperWidth}}>
      <div className={styles.hourly} ref={hourlyRef} style={{width}}>
        {days.map((_, i) => {
          const date = new Date(start);
          date.setDate(date.getDate() + i);

          const [dayStart, dayEnd] = getDayRange(date);
          const thisDayApps = appointments.filter((app) => dayStart <= app.startDate && dayEnd >= app.startDate);
          
          return <Hours key={i} day={i} appointments={thisDayApps} services={servicesMap} clients={clientsMap} />
        })}
      </div>
    </div>
  )
}