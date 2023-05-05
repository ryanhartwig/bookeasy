'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { weekDays } from '@/utility/data/days';
import { formatMilitaryTime } from '@/utility/functions/formatting/formatMilitaryTime';
import { useMemo, useState } from 'react';
import { AvailabilityForm } from './AvailabilityForm';
import styles from './tabs.module.scss';

interface AvailabilityProps {
  availabilitySlices: AvailabilitySlice[],
  businessId: string,
  userId?: string,
}

export const Availability: React.FC<AvailabilityProps> = ({availabilitySlices, userId, businessId}) => {
  const [formSlices, setFormSlices] = useState<AvailabilitySlice[]>();
  const [day, setDay] = useState<number>();
  
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
    
    return weekDays.map((d, i) => (
      <Setting label={d} key={d} onAction={() => {setFormSlices(availability.get(i) ?? []); setDay(i)}}>
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
      {formSlices && day!==undefined && 
        <AvailabilityForm 
          businessId={businessId} 
          day={day} 
          userId={userId}
          open={!!formSlices} 
          onClose={() => {setDay(undefined); setFormSlices(undefined)}} 
          slices={formSlices} 
        />
      }
    </div>
  )
}
 