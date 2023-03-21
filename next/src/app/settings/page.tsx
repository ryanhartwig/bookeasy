import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Setting } from '@/components/UI/Setting/Setting';
import { sample_user } from '@/utility/sample_data/sample_user';
import { sample_user_prefs } from '@/utility/sample_data/sample_user_prefs';
import Image from 'next/image';
import styles from './settings.module.scss';

export default function Page() {

  const user = sample_user;
  const prefs = sample_user_prefs;
  
  return (
    <div className={styles.Settings}>
      <Card className={styles.card}>
        <SectionLabel label="Profile Settings" className={styles.label} />
        <div className={styles.setting_block}>
          <Setting label='Picture'>
            <Image src={user.avatar ?? ''} alt='User avatar' width={60} />
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
          <Setting label='Hide my profile picture on booking sites' toggleState={prefs.private_photo} />
          <Setting label='Hide my email on booking sites' toggleState={prefs.private_email} />
          <Setting label='Hide my phone number on booking sites' toggleState={prefs.private_phone} />
        </div>
        <SectionLabel label="Notification Settings" className={styles.label} />
      </Card>
    </div>
  )
}