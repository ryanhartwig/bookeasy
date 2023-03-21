import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import styles from './settings.module.scss';

export default function Page() {
  return (
    <div className={styles.Settings}>
      <Card className={styles.card}>
        <SectionLabel label="Profile Settings" className={styles.label} />
        <SectionLabel label="Privacy Settings" className={styles.label} />
        <SectionLabel label="Notification Settings" className={styles.label} />
      </Card>
    </div>
  )
}