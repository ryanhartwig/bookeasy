'use client';

import { Card } from '@/components/UI/Card/Card';
import { Appointment, AppointmentData } from '@/types/Appointment';
import { useEffect, useState, useRef } from 'react';
import { AppointmentForm } from '../dashboard/appointmentForm/appointmentForm';
import { Hours } from '../dashboard/hours';
import styles from './daily.module.scss';

interface DailyProps {
  day: number,
  appointments: AppointmentData[],
  userId: string,
}

export const Daily: React.FC<DailyProps> = ({day, appointments, userId}) => {

  const [width, setWidth] = useState<string>('100%');
  const wrapperRef = useRef<HTMLDivElement>(undefined!);

  const [editAppointment, setEditAppointment] = useState<AppointmentData>();
  const [formOpen, setFormOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!editAppointment) return;
    setFormOpen(true);
  }, [editAppointment]);

  useEffect(() => {
    if (formOpen) return;
    setEditAppointment(undefined);
  }, [formOpen]);

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
        {editAppointment && 
          <AppointmentForm open={formOpen} setOpen={setFormOpen} userId={userId} initialAppointment={editAppointment} onSubmit={() => setEditAppointment(undefined)} />
        }
      </div>
    </div>
  )
}