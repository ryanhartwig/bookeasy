'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import { sample_base_availability } from '@/utility/sample_data/sample_base_availability';
import { useEffect, useMemo } from 'react';
import styles from './tabs.module.scss';

export const Availability = () => {

  const map = useMemo(() => new Map<number, {start: string, end: string}[]>(), []);

  useEffect(() => {
    sample_base_availability.slices.forEach(slice => {
      map.set(slice.day, (map.get(slice.day) ?? []).concat([{ start: slice.start, end: slice.end }]));
    });
  }, [map]);
  
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className={styles.Availability}>
      <div className={styles.header}>
        <p>Bookable Hours</p>
      </div>
      {days.map((d, i) => (
        <Setting label={d} key={d}>
          {(map.get(i) ?? []).map(({start, end}: {start: string, end: string}) => {
            return <div key={start}>
              <p>{start} - {end}</p>
            </div>
          })}
        </Setting>
      ))}
    </div>
  )
}
 