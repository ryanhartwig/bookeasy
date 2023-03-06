import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
import { sample_appointments } from '@/sample_data/sample_appointments';
import { getCurrentWeek } from '@/helpers/getCurrentWeek';
import { Service } from '@/types/Service';
import { SectionLabel } from '@/components/UI/SectionLabel';
import { Appointments } from './appointments';

export default function Page() {

  const [start, end] = getCurrentWeek();
  const servicesMap = new Map<string, Service>();
  const servicesIds = new Set<string>();
  
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
      <div className={styles.content}>
        <SectionLabel label='Today' />
        <Appointments appointments={sample_appointments} /> {/* Will be fetched and passed */}
        <SectionLabel label='This Week' />
      </div>
    </div>
  )
}