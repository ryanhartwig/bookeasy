'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { formatMilitaryTime } from '@/utility/functions/formatting/formatMilitaryTime';
import { useMemo, useState } from 'react';
import styles from './tabs.module.scss';

interface AvailabilityProps {
  availabilitySlices: AvailabilitySlice[],
}

export const Availability: React.FC<AvailabilityProps> = ({availabilitySlices}) => {
  const [formSlices, setFormSlices] = useState<AvailabilitySlice[]>();
  
  const availability = useMemo(() => {
    const map = new Map<number, AvailabilitySlice[]>();

    availabilitySlices.forEach(slice => {
      map.set(slice.day, 
        [...(map.get(slice.day) ?? []), slice]
          .sort((a, b) => 
            Number(a.start_time.split(':').join('')) - Number(b.start_time.split(':').join(''))
          )
      );
    });

    return map;
  }, [availabilitySlices]);

  const slices = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    
    return days.map((d, i) => (
      <Setting label={d} key={d} onAction={() => setFormSlices(availability.get(i) ?? [])}>
        {availability.get(i) ? (availability.get(i) ?? []).map((slice) => {
          return <div key={slice.start_time}>
            <p>{formatMilitaryTime(slice.start_time)} - {formatMilitaryTime(slice.end_time)}</p>
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
 