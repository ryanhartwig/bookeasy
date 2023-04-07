'use client';

import styles from './dashboard.module.scss';

import { Appointment } from '@/types/Appointment';

import { BsCameraVideo, BsCalendar, BsLink45Deg } from 'react-icons/bs';
import { Card } from '@/components/UI/Card/Card';
import { Service } from '@/types/Service';
import { Client } from '@/types/Client';
import { formatTime } from '@/utility/functions/formatting/formatTime';

interface AppointmentsProps {
  appointments: Appointment[],
  services: Service[],
  clients: Client[],
}

export const Appointments: React.FC<AppointmentsProps> = ({appointments, services, clients}) => {

  return (
    <div className={styles.appointments}>
      {appointments.length ? appointments.map(app => {
        const service = services.find(s => app.serviceId === s.id);
        if (!service) return <></>
        const canEnterSession = Date.now() < app.startDate + (1000 * 60 * service.duration) && Date.now() > app.startDate - (1000 * 60 * 60);

        return (
        <Card key={app.id} className={styles.appointment_wrapper}>
          <div className={styles.appointment} style={{borderLeftColor: service.color || 'blue'}}>
            <div>
              <div className={styles.app_header}>
                <p>{service.name}</p>
                <p>{service.duration}m</p>
              </div>
              <p className={styles.alt}>{formatTime(app.startDate)}</p>
            </div>

            <div className={styles.client}>
              <p className={styles.alt} style={{fontWeight: 100}}>with</p>
              <p>{clients.find(c => c.id === app.clientId)!.name}</p>
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
      )}) : <p className={styles.no_apps}>No appointments to show</p>}

    </div>
  )
}