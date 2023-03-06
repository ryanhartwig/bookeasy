'use client';

import styles from './dashboard.module.scss';

import { Card } from '@/components/UI/Card';
import { Appointment } from '@/types/Appointment';
import { sample_services } from '@/sample_data/sample_services';

interface AppointmentsProps {
  appointments: Appointment[],
}

export const Appointments: React.FC<AppointmentsProps> = ({appointments}) => {

  

  return (
    <div className={styles.apppointments}>
      {appointments.map(app => {
        const service = sample_services.find(s => app.service_id === s.id);
        if (!service) return <></>

        const start = new Date(app.start_date);
        let [hours, period] = start.toLocaleTimeString().split(' ');
        hours = hours.split(':').slice(0, 2).join(':');

        return (
        <Card key={app.id}>
          <div className={styles.appointment} style={{borderLeftColor: '#BA1682'}}>
            <div className={styles.app_header}>
              <p>{service.name}</p>
              <p>{service.duration}m</p>
            </div>

            <p className={styles.alt}>
              {`${hours} ${period}`}
            </p>
          </div>
        </Card>
      )})}

    </div>
  )
}