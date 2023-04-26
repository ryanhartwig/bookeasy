import styles from './appointment.module.scss';

import { AppointmentData } from "@/types/Appointment"
import { useMemo } from 'react';

interface AppointmentCardProps {
  app: AppointmentData;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({app}) => {

  const date = useMemo<string>(() => new Date(app.start_date).toDateString(), [app.start_date]);

  return (
    <div className={styles.app} style={{borderLeftColor: app.service.color}}>
      <p className={styles.paid} style={{color: !app.is_paid ? '' : 'rgb(39, 131, 174)'}} >{app.is_paid ? '✓ Paid' : 'Unpaid'}</p>
      
      <div>
        <p>{date}</p>
        <p>{app.service.duration} min</p>
      </div>

      <div>
        <p>{app.service.name}</p>
        <p>See in calendar</p>
      </div>

    </div>
  )
}