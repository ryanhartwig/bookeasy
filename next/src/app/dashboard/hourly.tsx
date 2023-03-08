'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './dashboard.module.scss';
import { Hours } from './hours';
import { useOptimizedResize } from '@/utility/hooks/useOptimizedResize';
import { getCurrentWeek } from '@/utility/functions/getCurrentWeek';
import { getDayRange } from '@/utility/functions/getDayRange';

import { sample_appointments } from '@/utility/sample_data/sample_appointments';

export const Hourly = () => {

  const days = Array(7).fill(true);
  const hourlyRef = useRef<HTMLDivElement>(undefined!);

  const [width, setWidth] = useState<string>('');
  const [start] = getCurrentWeek();
  
  const wrapperRef = useRef<HTMLDivElement>(undefined!);
  const wrapperWidth = useOptimizedResize(wrapperRef, '100%');

  useEffect(() => {
    setWidth(`calc(100% + ${hourlyRef.current.offsetWidth - hourlyRef.current.clientWidth}px)`)
  }, []);
  
  return (
    <div className={styles.hourlywrapper} ref={wrapperRef} style={{width: wrapperWidth}}>
      <div className={styles.hourly} ref={hourlyRef} style={{width}}>
        {days.map((_, i) => {
          const date = new Date(start);
          date.setDate(date.getDate() + i);

          const [dayStart, dayEnd] = getDayRange(date);
          const appointments = sample_appointments.filter((app) => dayStart <= app.start_date && dayEnd >= app.start_date);
          
          return <Hours key={i} day={i} appointments={appointments} />
        })}
      </div>
    </div>
  )
}