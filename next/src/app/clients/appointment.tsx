import styles from './appointment.module.scss';

import { Appointment } from "@/types/Appointment"
import { useMemo } from 'react';
import { Service } from '@/types/Service';
import { sample_services } from '@/utility/sample_data/sample_services';

interface AppointmentCardProps {
  app: Appointment;
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({app}) => {

  const service = useMemo<Service>(() => sample_services.find(s => s.id === app.service_id)!, []);

  const date = useMemo<string>(() => new Date(app.start_date).toDateString(), [app.start_date]);

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