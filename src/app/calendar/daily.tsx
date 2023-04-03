'use client';

import { Card } from '@/components/UI/Card/Card';
import { Appointment } from '@/types/Appointment';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { useEffect, useState, useRef } from 'react';
import { Hours } from '../dashboard/hours';
import styles from './daily.module.scss';

interface DailyProps {
  day: number,
  services: Map<string, Service>,
  clients: Map<string, Client>,
  appointments: Appointment[],
}

export const Daily: React.FC<DailyProps> = ({day, services, clients, appointments}) => {

  const [width, setWidth] = useState<string>('100%');
  const wrapperRef = useRef<HTMLDivElement>(undefined!);

  useEffect(() => {
    if (!wrapperRef.current ) return;
    setWidth(`calc(100% + ${wrapperRef.current.offsetWidth - wrapperRef.current.clientWidth}px - 0px)`);
  }, []);
  
  return (
    <div className={styles.daily}>
      <p className={styles.day}>{new Date(day).toDateString()}</p>
      <div className={styles.day_wrapper} >
        <Card ref={wrapperRef} className={styles.day_card} style={{width}}>
          <Hours 
            services={services} 
            clients={clients} 
            appointments={appointments}
          />
        </Card>  
      </div>
    </div>
    
  )
}