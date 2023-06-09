import { Card } from "@/components/UI/Card/Card"
import { AppointmentData } from "@/types/Appointment"
import { formatTime } from "@/utility/functions/formatting/formatTime"
import { BsCameraVideo, BsCalendar, BsLink45Deg, BsFillCameraVideoFill } from "react-icons/bs"

import styles from './dashboard.module.scss';


interface AppointmentActionCardProps {
  app: AppointmentData,
  canEnterSession?: boolean,
  mini?: boolean,
}

export const AppointmentActionCard: React.FC<AppointmentActionCardProps> = ({
  app, 
  canEnterSession = false, 
  mini = true // defaulting this to true until video calling is enabled
}) => {

  return (
    <Card className={styles.appointment_wrapper} style={{height: mini ? 108 : ''}}>
      <div className={styles.appointment} style={{borderLeftColor: app?.service?.color || 'blue', height: mini ? 108 : '', paddingBottom: mini ? '12px' : ''}}>
        <div>
          <div className={styles.app_header}>
            <div className={styles.app_name}>
              {app.is_video && 
                <div className={styles.video}>
                  <BsFillCameraVideoFill fontSize={12} />
                </div>
              }
              <p>{app.service?.name}</p>
            </div>
            <p>{app.service?.duration}m</p>
          </div>
          <p className={styles.alt}>{formatTime(app.start_date)}</p>
        </div>

        <div className={styles.client}>
          <p className={styles.alt} style={{fontWeight: 100}}>with</p>
          <p>{app.client?.name}</p>
        </div>

        {!mini && 
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
        </div> }
      </div>
    </Card>
  )
}