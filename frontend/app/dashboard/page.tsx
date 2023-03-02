import styles from './dashboard.module.scss';

import { SecondaryHeader } from "@/app/_components/SecondaryHeader"
import { sample_appointments } from '@/app/_sample_data/sample_appointments';
import { getCurrentWeek } from '@/app/_helpers/getCurrentWeek';
import { Card } from '../_components/UI/Card';
import { sample_services } from '../_sample_data/sample_services';
import { Service } from '../_types/Service';

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
        <p>Today</p>
        <div className={styles.apppointments}>
          {sample_appointments.map(app => {
            const service = sample_services.find(s => app.service_id === s.id);
            if (!service) return <></>

            const start = new Date(app.start_date);

            return (
            <Card key={app.id}>
              <div className={styles.appointment} style={{borderLeftColor: '#BA1682'}}>
                <div className={styles.app_header}>
                  <p>{service.name}</p>
                  <p>{service.duration}m</p>
                </div>

                <p className={styles.alt}>
                  {start.toDateString().split(' ').slice(0, -1).join(' ') 
                    + ' • '
                    + `${start.toLocaleTimeString()}`
                  }
                </p>
              </div>
            </Card>
          )})}

        </div>
        <p>This Week</p>
      </div>
    </div>
  )
}