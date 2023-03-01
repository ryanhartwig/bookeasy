import styles from './dashboard.module.css';

import { SecondaryHeader } from "@/components/SecondaryHeader"
import { sample_appointments } from '@/sample_data/sample_appointments';

export default function Page() {

  const weekStart = new Date();
  const day = weekStart.getDay();

  if (day === 0) { //sunday
    weekStart.setDate(weekStart.getDate() - 6); // sun = 6
  } else {
    weekStart.setDate(weekStart.getDate() - (day - 1)); // mon-sat = 0-5
  }
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const [start, end] = [
    `${weekStart.toDateString().split(' ').slice(1, 3).join(' ')}`,
    `${weekEnd.toDateString().split(' ').slice(1, 3).join(' ')}`
  ];
  
  return (
    <div className="Dashboard">
      <SecondaryHeader>
        <div className={styles.header}>
          <div>
            <p style={{fontWeight: 100}}>Week of</p>
            <p className={styles.headerLarge}>{start} - {end}</p>
          </div>
          <div>
            <p className={styles.headerLarge}>{sample_appointments.length}</p>
            <p style={{fontWeight: 100}}>Appointments</p>
          </div>
          <div>
            <p className={styles.headerLarge}>$0.00</p>
            <p style={{fontWeight: 100}}>Projected</p>
          </div>
        </div>
      </SecondaryHeader>
      <p></p>
    </div>
  )
}