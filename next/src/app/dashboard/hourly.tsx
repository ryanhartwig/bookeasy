'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './dashboard.module.scss';
import { Hours } from './hours';

import { sample_appointments } from '@/sample_data/sample_appointments';

export const Hourly = () => {

  const days = Array(7).fill(true);
  const hourlyRef = useRef<HTMLDivElement>(undefined!);
  const [width, setWidth] = useState<string>('');

  useEffect(() => {
    setWidth(`calc(100% + ${hourlyRef.current.offsetWidth - hourlyRef.current.clientWidth}px)`);
  }, []);
  
  return (
    <div className={styles.hourlywrapper}>
      <div className={styles.hourly} ref={hourlyRef} style={{width}}>
        {days.map((_, i) => {

          return <Hours key={i} day={i} appointments={[]} />
        })}
      </div>
    </div>
  )
}