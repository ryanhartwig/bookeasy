'use client';

import styles from './weekly_overview.module.scss';

import { sample_base_availability } from '@/utility/sample_data/sample_base_availability';
import { Appointment } from '@/types/Appointment';
import { useEffect, useMemo } from 'react';
import { Service } from '@/types/Service';
import { Client } from '@/types/Client';
import { formatTime } from '@/utility/functions/formatTime';

interface HoursProps {
  day: number,
  appointments: Appointment[],
  services: Map<string, Service>,
  clients: Map<string, Client>,
}

interface AppointmentData extends Appointment {
  client_name: string,
  service_name: string,
}

export const Hours: React.FC<HoursProps> = ({day, appointments, services, clients}) => {
  const blocks = new Array(96).fill(true);
  const availability = useMemo(() => new Map<number, string[][]>(), []);
  const appointmentIndices = useMemo(() => new Map<number, AppointmentData>(), []);

  useEffect(() => {
    appointments.forEach(app => {
      const date = new Date(app.start_date);
      const calculatedIndex = (date.getHours() * 4) + (date.getMinutes() / 15);
      const client_name = clients.get(app.client_id)?.name || '';
      const service_name = services.get(app.service_id)?.name || '';

      appointmentIndices.set(calculatedIndex, {
        ...app,
        client_name,
        service_name,
      });
    });

    sample_base_availability.slices.forEach(slice => {
      const {start, end, day} = slice;
      const current = availability.get(day) || [];
  
      current.push([start, end]);
      availability.set(day, current);
    });
  }, [appointmentIndices, appointments, availability, clients, services]);

  return (
    <div className={styles.hours}>
      {blocks.map((_, i) => {
        const borderBottomColor = i % 4 === 3 ? '#A3A3A3' : '';

        const appointment = appointmentIndices.get(i);
        let height: string = '';

        if (appointment) {
          height = `${(appointment.end_date - appointment.start_date) / 1000 / 60 - 3}px`;
        }

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
            {appointment && 
              <div className={styles.weekly_app} style={{height}}>
                <div>
                  <p style={{fontSize: 12}}>{appointment.client_name}</p>
                  <p>{formatTime(appointment.start_date)}</p>
                </div>
                <p>{appointment.service_name}</p>
              </div>
            }
          </div>
        )
      })}
    </div>
  )
}