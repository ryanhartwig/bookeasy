/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import styles from './weekly_overview.module.scss';

import { sample_base_availability } from '@/utility/sample_data/sample_base_availability';
import { useEffect, useMemo, useState } from 'react';
import clsx from 'clsx';
import { formatTime } from '@/utility/functions/formatting/formatTime';
import { AppointmentData } from '@/types/Appointment';

interface HoursProps {
  day?: number,
  appointments: AppointmentData[],
}

export const Hours: React.FC<HoursProps> = ({day, appointments}) => {
  const [availability, setAvailability] = useState<Map<number, string[][]>>();
  const [appointmentIndices, setAppointmentIndices] = useState<Map<number, AppointmentData>>(new Map());

  useEffect(() => {
    setAppointmentIndices(p => {
      const prev = new Map<number, AppointmentData>();

      appointments.forEach(app => {
        const date = new Date(app.start_date);
        const calculatedIndex = (date.getHours() * 4) + (date.getMinutes() / 15);
        prev.set(calculatedIndex, app);
      });

      return prev;
    })
  }, [appointments]);
  
  useEffect(() => {
    if (day === undefined) return;
    setAvailability(p => {
      const prev = new Map(p);

      sample_base_availability.slices.forEach(slice => {
        const {start_time: start, end_time: end, day} = slice;
        const current = prev.get(day) || [];
    
        current.push([start, end]);
        prev.set(day, current);
      });

      return prev;
    });
  }, []);
  
  const blocks = useMemo(() => {
    const b = new Array(96).fill(true)
    return b.map((_, i) => {
      const borderBottomColor = i % 4 === 3 ? '#A3A3A3' : 'inherit';

      const appointment = appointmentIndices.get(i);
      let height: string = '';

      if (appointment) {
        height = `${appointment.service_duration - 3}px`;
      }

      const hour = i / 4; // 0 - 23
      const segment = (i % 4) * 15; // 0 15 30 45

      const isHour = i % 4 === 0;
      const hour12 = hour % 12 === 0 ? 12 : hour % 12;
      const period = hour < 12 ? 'am' : 'pm';

      let covered = availability === undefined ? false : true;

      if (day !== undefined && availability?.has(day)) {
        covered = !availability.get(day)!.some(([start, end]) => {
          let [startHr, startMin] = start.split(':').map(s => Number(s));
          let [endHr, endMin] = end.split(':').map(s => Number(s));

          return (startHr === hour ? startMin <= segment : startHr < hour)
            && (endHr === hour ? endMin > segment : endHr > hour);
        });
      }

      const color = appointment?.service.color;

      return (
        <div key={i} className={styles.block} style={{borderBottomColor}}>
          {covered && <div className={styles.cover} />}
          {isHour && <p>{hour12} {period}</p>}
          {appointment && 
            <div className={clsx(styles.weekly_app, 'noselect')} style={{height, borderColor: color}}>
              <div>
                <p style={{fontSize: 12}}>{appointment.client.name}</p>
                <p>{formatTime(appointment.start_date)}</p>
              </div>
              <p>{appointment.service.name}</p>
            </div>
          }
        </div>
      )
    })
  }, [appointmentIndices, availability, day]);
  
  return (
    <div className={styles.hours}>
      {blocks}
    </div>
  )
}