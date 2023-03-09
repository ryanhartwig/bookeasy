'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './weekly_overview.module.scss';
import { Hours } from './hours';
import { useOptimizedResize } from '@/utility/hooks/useOptimizedResize';
import { getCurrentWeek } from '@/utility/functions/getCurrentWeek';
import { getDayRange } from '@/utility/functions/getDayRange';

import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_services } from '@/utility/sample_data/sample_services';

export const Hourly = () => {

  const days = Array(7).fill(true);
  const hourlyRef = useRef<HTMLDivElement>(undefined!);

  const [width, setWidth] = useState<string>('');
  const [start] = getCurrentWeek();

  const services = useMemo(() => new Map<string, Service>(), []);
  const clients = useMemo(() => new Map<string, Client>(), []);
  
  const wrapperRef = useRef<HTMLDivElement>(undefined!);
  const wrapperWidth = useOptimizedResize(wrapperRef, '100%');

  useEffect(() => {
    setWidth(`calc(100% + ${hourlyRef.current.offsetWidth - hourlyRef.current.clientWidth}px)`)
  }, []);

  useEffect(() => {
    sample_services.forEach(s => services.set(s.id, s));
    sample_clients.forEach(c => clients.set(c.id, c));
  }, [clients, services]);
  
  return (
    <div className={styles.hourlywrapper} ref={wrapperRef} style={{width: wrapperWidth}}>
      <div className={styles.hourly} ref={hourlyRef} style={{width}}>
        {days.map((_, i) => {
          const date = new Date(start);
          date.setDate(date.getDate() + i);

          const [dayStart, dayEnd] = getDayRange(date);
          const appointments = sample_appointments.filter((app) => dayStart <= app.start_date && dayEnd >= app.start_date);
          
          return <Hours key={i} day={i} appointments={appointments} services={services} clients={clients} />
        })}
      </div>
    </div>
  )
}