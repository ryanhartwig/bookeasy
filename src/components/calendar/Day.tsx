'use client';

import './Day.scss';

import clsx from 'clsx';

import { getDayRange as minMaxDate } from '@/utility/functions/dateRanges/getDayRange';
import { CSSProperties } from 'react';
import { AppointmentData } from '@/types/Appointment';

interface DayProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
  onSelect?: ([min, max]: [number, number]) => any,
  selected?: [number, number],
  style?: CSSProperties,
  appointments: AppointmentData[],
}

export const Day: React.FC<DayProps> = ({date, style, viewing, onSelect, selected, appointments}) => {

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
            return (
              <div key={app.id} className='Day-appointment' style={{borderColor: app.service.color}}>
                <p>{app.service.name}</p>
              </div>
            )
          }
          )}
        </div>
      </div>
    </div>
  )
}