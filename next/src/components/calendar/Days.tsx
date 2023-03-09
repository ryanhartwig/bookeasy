'use client';

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
  selected?: [number, number]
}

export const Days = ({date, viewing, selected, onSelect}: DaysProps) => {

  const days = useMemo(() => {
    const weekDate = new Date(date);
    const array = new Array(42).fill(0);

    return array.map((_, i) => {
      const day = weekDate.getDate();
      if (i && day === 0) {
        weekDate.setMonth(weekDate.getMonth() + 1);
      }

      weekDate.setDate(day + 1);
      
      // return new Date(weekDate);
      const d = new Date(weekDate);
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
        date={d} 
        viewing={viewing} 
        style={style}
      />
    })
  }, [date, onSelect, selected, viewing]);


  return (
    <div className='Days'>
      {days}
    </div>
  )
}