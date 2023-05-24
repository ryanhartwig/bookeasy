import { Header } from "@/components/Header";
import { Avatar } from "@/components/UI/Avatar/Avatar";
import { Card } from "@/components/UI/Card/Card";
import { LoadingDots } from "@/components/UI/LoadingDots/LoadingDots";
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel";
import { Setting } from "@/components/UI/Setting/Setting";
import { Skeleton } from "@/components/UI/Skeleton/Skeleton";
import clsx from "clsx";
import styles from './settings.module.scss';

export default function Page() {

  return (
    <>
      <Header text="Settings" loading />
      <div className={styles.Settings}>
        <Card className={styles.card} style={{pointerEvents: 'none'}}>
          <SectionLabel label="Profile Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Picture' >
              {/* <Avatar src={''} size={60} /> */}
              <Skeleton style={{borderRadius: '50%', height: 60, width: 60}}  />
            </Setting>
            <Setting label='Name'>
              <LoadingDots style={{padding: 4}} />
            </Setting>
            <Setting label='Email' email >
              <LoadingDots style={{padding: 4}} />
            </Setting>
            <Setting label='Phone'>
              <LoadingDots style={{padding: 4}} />
            </Setting>
          </div>

          <SectionLabel label="Privacy Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Hide my profile picture on booking sites' 
              toggleState={false} 
            />
            <Setting label='Hide my email on booking sites' 
              toggleState={false} 
            />
            <Setting label='Hide my phone number on booking sites' 
              toggleState={false} 
            />
          </div>

          <SectionLabel label="Notification Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Receive email notification when an appointment is booked or cancelled' 
              toggleState={false} 
            />
            <Setting label='Receive email reminders for upcoming appointments' 
              toggleState={false} 
            />
            <Setting label='Receive appointments overview email on work days' 
              toggleState={false} 
            />
            <Setting label='Receive at:' className={clsx(styles.receiveAt, {[styles.enabled]: false})}>
              <p>9:00 am</p>
            </Setting>
          </div>
        </Card>
      </div>
    </>
  )
}