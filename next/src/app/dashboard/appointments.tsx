'use client';

import styles from './dashboard.module.scss';

import { Appointment } from '@/types/Appointment';
import { sample_services } from '@/utility/sample_data/sample_services';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { formatTime } from '@/utility/functions/formatTime';

import { BsCameraVideo, BsCalendar, BsLink45Deg } from 'react-icons/bs';
import { Card } from '@/components/UI/Card/Card';

interface AppointmentsProps {
  appointments: Appointment[],
}

export const Appointments: React.FC<AppointmentsProps> = ({appointments}) => {
  
  return (
    <div className={styles.appointments}>
      {appointments.map(app => {
        const service = sample_services.find(s => app.service_id === s.id);
        if (!service) return <></>
        const canEnterSession = Date.now() < app.start_date + (1000 * 60 * service.duration) && Date.now() > app.start_date - (1000 * 60 * 60);

        return (
        <Card key={app.id} className={styles.appointment_wrapper}>
          <div className={styles.appointment} style={{borderLeftColor: service.color || 'blue'}}>
            <div>
              <div className={styles.app_header}>
                <p>{service.name}</p>
                <p>{service.duration}m</p>
              </div>
              <p className={styles.alt}>{formatTime(app.start_date)}</p>
            </div>

            <div className={styles.client}>
              <p className={styles.alt} style={{fontWeight: 100}}>with</p>
              <p>{sample_clients.find(c => c.id === app.client_id)!.name}</p>
            </div>

            <div className={styles.actions}>
              {/* Left Actions */}
              <div>
                <div className={styles.action} style={{opacity: canEnterSession ? 1 : 0.5, pointerEvents: canEnterSession ? 'auto' : 'none'}}>
                  <div style={{backgroundColor: '#B54078', width: 44}}>
                    <BsCameraVideo className={styles.action_icon} />
                  </div>

                  <p>Enter Session</p>
                </div>
              </div>

              {/* Right Actions */}
              <div>
                <div className={styles.action}>
                  <div style={{backgroundColor: '#55BDAA'}}>
                    <BsCalendar className={styles.action_icon} size={12} />
                  </div>

                  <p>Calendar</p>
                </div>
                <div className={styles.action}>
                  <div style={{backgroundColor: '#5482FB'}}>
                    <BsLink45Deg className={styles.action_icon} />
                  </div>

                  <p>Copy Link</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )})}

    </div>
  )
}