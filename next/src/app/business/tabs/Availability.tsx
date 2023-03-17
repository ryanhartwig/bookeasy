'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

export const Availability = () => {

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className={styles.Availability}>
      <div className={styles.header}>
        <p>Bookable Hours</p>
      </div>
      {days.map(d => (
        <Setting label={d} key={d}>
          <p>n</p>
        </Setting>
      ))}
    </div>
  )
}
