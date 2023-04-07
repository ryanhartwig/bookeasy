import { Header } from '@/components/Header';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Setting } from '@/components/UI/Setting/Setting';
import { getUser } from '@/utility/functions/fetch/getUserDetails';
import { formatMilitaryTime } from '@/utility/functions/formatting/formatMilitaryTime';
import { userId } from '@/utility/sample_data/sample_userId';
import styles from './settings.module.scss';

export default async function Page() {

  const { data: user } = await getUser(userId);

  return (
    <>
      <Header text="Settings" />
      {user && user.prefs && <div className={styles.Settings}>
        <Card className={styles.card}>
          <SectionLabel label="Profile Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Picture'>
              <Avatar src={user?.avatar} size={60} />
            </Setting>
            <Setting label='Name'>
              <p>{user.name}</p>
            </Setting>
            <Setting label='Email'>
              <p>{user.email}</p>
            </Setting>
            <Setting label='Phone'>
              <p>{user.phone ?? 'None'}</p>
            </Setting>
          </div>

          <SectionLabel label="Privacy Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Hide my profile picture on booking sites' toggleState={user.prefs.privatePhoto} />
            <Setting label='Hide my email on booking sites' toggleState={user.prefs.privateEmail} />
            <Setting label='Hide my phone number on booking sites' toggleState={user.prefs.privatePhone} />
          </div>
          <SectionLabel label="Notification Settings" className={styles.label} />
          <div className={styles.setting_block}>
            <Setting label='Receive email notification when an appointment is booked or cancelled' toggleState={user.prefs.notificationBooking} />
            <Setting label='Receive email reminders for upcoming appointments' toggleState={user.prefs.notificationReminder} />
            <Setting label='Receive appointments overview email on work days' toggleState={user.prefs.notificationOverview} />
            <Setting label='Receive at:' style={{ paddingLeft: 50, opacity: user.prefs.notificationOverview ? 1 : 0.5, pointerEvents: user.prefs.notificationOverview ? 'all' : 'none' }}>
              <p>{user.prefs.notificationOverviewTime ? formatMilitaryTime(user.prefs.notificationOverviewTime) : 'Unset'}</p>
            </Setting>
          </div>
        </Card>
      </div>}
    </>
  )
}