import { Card } from "@/components/UI/Card/Card"
import { Appointment } from "@/types/Appointment"
import { Client } from "@/types/Client"
import { Service } from "@/types/Service"
import { formatTime } from "@/utility/functions/formatting/formatTime"
import { BsCameraVideo, BsCalendar, BsLink45Deg } from "react-icons/bs"

import styles from './dashboard.module.scss';


interface AppointmentActionCardProps {
  app: Appointment,
  service: Service,
  client: Client,
  canEnterSession: boolean,
}

export const AppointmentActionCard: React.FC<AppointmentActionCardProps> = ({app, service, client, canEnterSession}) => {

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
          <p>{client.name}</p>
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
  )
}