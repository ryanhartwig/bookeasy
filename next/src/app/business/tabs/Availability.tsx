'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import { formatMilitaryTime } from '@/utility/functions/formatMilitaryTime';
import { sample_base_availability } from '@/utility/sample_data/sample_base_availability';
import { useEffect, useMemo } from 'react';
import styles from './tabs.module.scss';

export const Availability = () => {

  const availability = useMemo(() => {
    const map = new Map<number, {start: string, end: string}[]>();

    sample_base_availability.slices.forEach(slice => {
      map.set(slice.day, 
        (map.get(slice.day) ?? [])
          .concat([{ start: slice.start, end: slice.end }])
          .sort((a, b) => 
            Number(a.start.split(':').join('')) - Number(b.start.split(':').join(''))
          )
      );
    });

    return map;
  }, []);

  const slices = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    return days.map((d, i) => (
      <Setting label={d} key={d}>
        
        {availability.get(i) ? (availability.get(i) ?? []).map(({start, end}: {start: string, end: string}) => {
          return <div key={start}>
            <p>{formatMilitaryTime(start)} - {formatMilitaryTime(end)}</p>
          </div>
        }) : <p>None</p>}
      </Setting>
    ))
  }, [availability]);

  return ( 
    <div className={styles.Availability}>
      <div className={styles.header}>
        <p>Bookable Hours</p>
      </div>
      {slices}
    </div>
  )
}
 