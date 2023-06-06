import styles from './appointment.module.scss';

import { AppointmentData } from "@/types/Appointment"
import { useMemo } from 'react';
import { getDateTimeStringFull } from '@/utility/functions/conversions/getDateTimeString';

interface AppointmentCardProps {
  app: AppointmentData,
  setSelectedAppointment?: React.Dispatch<React.SetStateAction<AppointmentData | undefined>>,
  showProvider?: boolean,
}

export const AppointmentCard: React.FC<AppointmentCardProps> = ({app, setSelectedAppointment, showProvider = false}) => {

  const date = useMemo<string>(() => getDateTimeStringFull(app.start_date), [app.start_date]);

  return (
    <div className={styles.app} style={{borderLeftColor: app.service.color}}>
      <p className={styles.paid} style={{color: !app.is_paid ? '' : 'rgb(39, 131, 174)'}} >{app.is_paid ? '✓ Paid' : 'Unpaid'}</p>
      
      <div>
        <p>{app.service.name} - ${app.service_cost.toFixed(2)}</p>
        {showProvider && <p className={styles.provider}>{app.business.name}</p>}
        <p className={styles.duration}>{app.service_duration} min</p>
      </div>

      <div>
        <div className={styles.info}>
          <p className={styles.date}>{date}</p>

        </div>
        {setSelectedAppointment && <p className={styles.edit} onClick={() => setSelectedAppointment(app)}>Edit</p>}
      </div>

    </div>
  )
}