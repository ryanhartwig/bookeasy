import { Card } from '@/components/UI/Card';
import clsx from 'clsx';
import styles from './business.module.scss';

export default function Page() {
  return (
    <div className={styles.business}>
      {/* Left panels */}
      <div>
        <Card className={clsx(styles.card, styles.overview)} />
        <Card className={clsx(styles.card, styles.metrics)} />
      </div>

      {/* Right panel */}
      <div>
        <Card className={clsx(styles.card, styles.prefs)} />
      </div>
    </div>
  )
}