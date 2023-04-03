import styles from './appointment.module.scss';

import { Appointment } from "@/types/Appointment"
import { useMemo } from 'react';
import { Service } from '@/types/Service';

interface AppointmentCardProps {
  app: Appointment;
  services: Service[],
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({app, services}) => {

  const service = useMemo<Service>(() => services.find(s => s.id === app.serviceId)!, [app.serviceId, services]);
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