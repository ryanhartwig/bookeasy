'use client';

import styles from './dashboard.module.scss';

import { Card } from '@/components/UI/Card';
import { Appointment } from '@/types/Appointment';
import { sample_services } from '@/sample_data/sample_services';
import { formatTime } from '@/helpers/formatTime';

interface AppointmentsProps {
  appointments: Appointment[],
}

export const Appointments: React.FC<AppointmentsProps> = ({appointments}) => {

  

  return (
    <div className={styles.apppointments}>
      {appointments.map(app => {
        const service = sample_services.find(s => app.service_id === s.id);
        if (!service) return <></>

        return (
        <Card key={app.id}>
          <div className={styles.appointment} style={{borderLeftColor: '#BA1682'}}>
            <div className={styles.app_header}>
              <p>{service.name}</p>
              <p>{service.duration}m</p>
            </div>

            <p className={styles.alt}>{formatTime(app.start_date, true)}</p>
          </div>
        </Card>
      )})}

    </div>
  )
}