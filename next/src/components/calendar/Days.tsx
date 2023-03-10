'use client';

import { Appointment } from '@/types/Appointment';
import { getDayRange } from '@/utility/functions/getDayRange';
import { CSSProperties, useMemo } from 'react';
import { Day } from './Day';
import './Days.css';

interface DaysProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
  onSelect?: ([min, max]: [number, number]) => any,
  selected?: [number, number],
  appointments: Appointment[],
}

export const Days: React.FC<DaysProps> = ({date, viewing, selected, onSelect, appointments}) => {

  const days = useMemo(() => {
    const weekDate = new Date(date);
    const array = new Array(42).fill(0);

    return array.map((_, i) => {
      const day = weekDate.getDate();
      
      // This may be redundant? day should never === 0
      if (i && day === 0) {
        weekDate.setMonth(weekDate.getMonth() + 1);
      }

      weekDate.setDate(day + 1);
      
      const d = new Date(weekDate);
      const [start, end] = getDayRange(d);
      const style: CSSProperties = {}

      if (i < 7) {
        style.borderTop = 'none';
      }
      if (i % 7 === 0) {
        style.borderLeft = 'none';
      }
      
      return <Day 
        key={`${i}-${d.getDate}`} 
        selected={selected} 
        onSelect={onSelect} 
        appointments={appointments.filter(app => app.start_date >= start && app.start_date <= end)}
        date={d} 
        viewing={viewing} 
        style={style}
      />
    })
  }, [appointments, date, onSelect, selected, viewing]);


  return (
    <div className='Days'>
      {days}
    </div>
  )
}