'use client';

import styles from './dashboard.module.scss';

import { sample_base_availability } from '@/utility/sample_data/sample_base_availability';
import { Appointment } from '@/types/Appointment';
import { useEffect, useMemo } from 'react';
import { sample_services } from '@/utility/sample_data/sample_services';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { Service } from '@/types/Service';
import { Client } from '@/types/Client';

/* 

Formula to convert hours / mins into index:

  (Date.getHours() * 4) + (Date.getMinutes() / 15)

*/

interface HoursProps {
  day: number,
  appointments: Appointment[],
  services: Map<string, Service>,
  clients: Map<string, Client>,
}

export const Hours: React.FC<HoursProps> = ({day, appointments, services, clients}) => {
  const blocks = new Array(96).fill(true);

  const availability = useMemo(() => new Map<number, string[][]>(), []);
  const appointmentIndices = useMemo(() => new Map<number, Appointment>(), []);
  

  useEffect(() => {
    appointments.forEach(app => {
      const date = new Date(app.start_date);
      const calculatedIndex = (date.getHours() * 4) + (date.getMinutes() / 15);
      appointmentIndices.set(calculatedIndex, app);
    });

    sample_base_availability.slices.forEach(slice => {
      const {start, end, day} = slice;
      const current = availability.get(day) || [];
  
      current.push([start, end]);
      availability.set(day, current);
    });
  }, [appointmentIndices, appointments, availability]);

  

  return (
    <div className={styles.hours}>
      {blocks.map((_, i) => {
        const borderBottomColor = i % 4 === 3 ? '#A3A3A3' : '';

        const hour = i / 4; // 0 - 23
        const segment = (i % 4) * 15; // 0 15 30 45

        const isHour = i % 4 === 0;
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? 'am' : 'pm';

        let covered = true;


        const dayAvailability = availability.get(day);

        if (dayAvailability) {
          covered = !dayAvailability.some(([start, end]) => {
            let [startHr, startMin] = start.split(':').map(s => Number(s));
            let [endHr, endMin] = end.split(':').map(s => Number(s));

            return (startHr === hour ? startMin <= segment : startHr < hour)
              && (endHr === hour ? endMin > segment : endHr > hour);
          })
        }

        return (
          <div key={i} className={styles.block} style={{borderBottomColor}}>
            {covered && <div className={styles.cover} />}
            {isHour && <p>{hour12} {period}</p>}
          </div>
        )
      })}
    </div>
  )
}