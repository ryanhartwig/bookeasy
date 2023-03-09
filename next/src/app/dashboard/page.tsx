import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import { getCurrentWeek } from '@/utility/functions/getCurrentWeek';
import { SectionLabel } from '@/components/UI/SectionLabel';
import { Appointments } from './appointments';
import { Card } from '@/components/UI/Card';
import { WeekDays } from './weekDays';
import { Hourly } from './hourly';

export default function Page() {

  const [start, end] = getCurrentWeek();
  
  return (
    <div id="dashboard" className={styles.dashboard}>
      <SecondaryHeader>
        <div className={styles.header}>
          <div>
            <p style={{fontWeight: 100}}>Week of</p>
            <p className={styles.headerLarge}>
              {`${start.toDateString().split(' ').slice(1, 3).join(' ')}`} - {`${end.toDateString().split(' ').slice(1, 3).join(' ')}`}
            </p>
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
      <div className={styles.content}>
        <SectionLabel label='Today' />
        <Appointments appointments={sample_appointments} />
        <SectionLabel label='This Week' />
        <Card className={styles.weekview_card}>
          <WeekDays start={start} />
          <Hourly />
        </Card>
      </div>
    </div>
  )
}