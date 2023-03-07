import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
import { sample_appointments } from '@/sample_data/sample_appointments';
import { getCurrentWeek } from '@/helpers/getCurrentWeek';
import { SectionLabel } from '@/components/UI/SectionLabel';
import { Appointments } from './appointments';
import { Card } from '@/components/UI/Card';
import { WeekView } from './weekView';
import { Hourly } from './hourly';

export default function Page() {

  const [start, end, startDate] = getCurrentWeek();
  
  return (
    <div className={styles.dashboard}>
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
      <div className={styles.content}>
        <SectionLabel label='Today' />
        <Appointments appointments={sample_appointments} /> {/* Will be fetched and passed */}
        <SectionLabel label='This Week' />
        <Card className={styles.weekview_card}>
          <WeekView start={startDate} />
          <Hourly />
        </Card>
      </div>
    </div>
  )
}