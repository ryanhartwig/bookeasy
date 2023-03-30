'use client';

import './Day.scss';

import clsx from 'clsx';

import { getDayRange as minMaxDate } from '@/utility/functions/getDayRange';
import { CSSProperties } from 'react';
import { Appointment } from '@/types/Appointment';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';

interface DayProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
  onSelect?: ([min, max]: [number, number]) => any,
  selected?: [number, number],
  style?: CSSProperties,
  appointments: Appointment[],
  services: Map<string, Service>,
  clients: Map<string, Client>,
}

export const Day: React.FC<DayProps> = ({date, style, viewing, onSelect, selected, appointments, clients, services}) => {

  const today = new Date();
  const ss = [0, 6].includes(date.getDay());

  const [rangeMin, rangeMax] = minMaxDate(date);

  return (
    <div className={clsx('Day', {ss})} 
      onClick={() => onSelect && onSelect([rangeMin, rangeMax])}
      style={{cursor: onSelect && 'pointer', ...style}}
    >
      <div className={clsx(
        'Day-content', 
        {'out-of-view': viewing.month !== date.getMonth()},
        {'today': viewing.year === today.getFullYear() && viewing.month === today.getMonth() && date.getDate() === today.getDate()},
        {ss},
        {'selected': selected?.includes(rangeMin)}
      )}>
        <p>{date.getDate()}</p>
        <div className='Day-appointments'>
          {appointments.map(app => {
            const service = services.get(app.serviceId);
            const client = clients.get(app.clientId);
            const color = service?.color ?? 'initial';

            return (
              <div key={app.id} className='Day-appointment' style={{borderColor: color}}>
                <p>{app.serviceName}</p>
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}