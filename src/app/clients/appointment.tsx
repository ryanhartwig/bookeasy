import styles from './appointment.module.scss';

import { Appointment } from "@/types/Appointment"
import { useMemo } from 'react';
import { Service } from '@/types/Service';

interface AppointmentCardProps {
  app: Appointment;
  service: Service,
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({app, service}) => {

  const date = useMemo<string>(() => new Date(app.startDate).toDateString(), [app.startDate]);

  return (
    <div className={styles.app} style={{borderLeftColor: service.color}}>
      <div>
        <p>{date}</p>
        <p>{service.duration} min</p>
      </div>
      
      <div>
        <p>{service.name}</p>
        <p>See in calendar</p>
      </div>
    </div>
  )
}