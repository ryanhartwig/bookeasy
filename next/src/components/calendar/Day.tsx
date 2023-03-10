'use client';

import './Day.scss';

import clsx from 'clsx';

import { getDayRange as minMaxDate } from '@/utility/functions/getDayRange';
import { CSSProperties } from 'react';

interface DayProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
  onSelect?: ([min, max]: [number, number]) => any,
  selected?: [number, number],
  style?: CSSProperties,
}

export const Day = ({date, style, viewing, onSelect, selected}: DayProps) => {

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
      </div>
    </div>
  )
}