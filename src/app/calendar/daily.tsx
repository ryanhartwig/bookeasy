'use client';

import { Card } from '@/components/UI/Card/Card';
import { Appointment, AppointmentData } from '@/types/Appointment';
import { useEffect, useState, useRef } from 'react';
import { Hours } from '../dashboard/hours';
import styles from './daily.module.scss';

interface DailyProps {
  day: number,
  appointments: AppointmentData[],
}

export const Daily: React.FC<DailyProps> = ({day, appointments}) => {

  const [width, setWidth] = useState<string>('100%');
  const wrapperRef = useRef<HTMLDivElement>(undefined!);

  const [editAppointment, setEditAppointment] = useState<AppointmentData>();


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
            appointments={appointments}
            setEditAppointment={setEditAppointment}
          />
        </Card>  
      </div>
    </div>
    
  )
}