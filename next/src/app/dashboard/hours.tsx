'use client';

import styles from './dashboard.module.scss';

import { sample_base_availability } from '@/sample_data/sample_base_availability';

/* 

Formula to convert hours / mins into index:

  (Date.getHours() * 4) + (Date.getMinutes() / 15)

*/

interface HoursProps {
  day: number,
}

export const Hours: React.FC<HoursProps> = ({day}) => {
  const blocks = new Array(96).fill(true);
  const availability = new Map<number, string[][]>();

  sample_base_availability.slices.forEach(slice => {
    const {start, end, day} = slice;
    const current = availability.get(day) || [];

    current.push([start, end]);
    availability.set(day, current);
  })

  console.log(availability);
  
  return (
    <div className={styles.hours}>
      {blocks.map((_, i) => {
        const borderBottomColor = i % 4 === 3 ? '#A3A3A3' : '';

        const hour = i / 4; // 0 - 23
        const segment = (i % 4) * 15; // 0 15 30 45

        const isHour = i % 4 === 0;
        const hour12 = hour % 12 === 0 ? 12 : hour % 12;
        const period = hour < 12 ? 'am' : 'pm';

        let covered = true;

        const dayAvailability = availability.get(day);

        if (dayAvailability) {
          covered = !dayAvailability.some(([start, end]) => {
            let [startHr, startMin] = start.split(':').map(s => Number(s));
            let [endHr, endMin] = end.split(':').map(s => Number(s));

            return (startHr === hour ? startMin <= segment : startHr < hour)
              && (endHr === hour ? endMin > segment : endHr > hour);
          })
        }

        return (
          <div key={i} className={styles.block} style={{borderBottomColor}}>
            {covered && <div className={styles.cover} />}
            {isHour && <p>{hour12} {period}</p>}
          </div>
        )
      })}
    </div>
  )
}