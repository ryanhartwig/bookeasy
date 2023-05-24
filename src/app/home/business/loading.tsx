import { Header } from '@/components/Header';
import { Card } from '@/components/UI/Card/Card';
import { LoadingDots } from '@/components/UI/LoadingDots/LoadingDots';
import { Skeleton } from '@/components/UI/Skeleton/Skeleton';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import clsx from 'clsx';
import styles from './business.module.scss';


export default function Loading({skipHeader = false}: {skipHeader?: boolean}) {
  
  return (
    <>
      {!skipHeader && <Header text='My Business' loading />}
      <div className={styles.business}>
        {/* Left panels */}
        <div>    
          <Card className={clsx(styles.card, styles.overview)} >
            <Skeleton style={{width: 100, height: 100}} className={styles.loadingAvatar} />
            <LoadingDots className={styles.name} style={{marginTop: 0}}>Loading...</LoadingDots>
            <hr />
            <div className={styles.details}>
              <div>
                <LoadingDots />
                <p>client(s)</p>  
              </div>
              <div>
                <LoadingDots />
                <p>service(s)</p>  
              </div>
            </div>
          </Card>
          <Card className={clsx(styles.card, styles.metrics)}>
          <div className={styles.year_select}>
            <h2>{new Date().getFullYear()}</h2>
          </div>

          <div className={styles.metric_data}>
            <div style={{textAlign: 'center'}}>
              <LoadingDots className={styles.metric} />
              <p className={styles.metric_label}>
                Total Paid
              </p>
              <LoadingDots className={styles.metric} />
              <p className={styles.metric_label}>
                Total Unpaid
              </p>
              <LoadingDots className={styles.metric} />
              <p className={styles.metric_label}>
                Appointment(s)
              </p>
              <LoadingDots className={styles.metric} />
              <p className={styles.metric_label}>
                Accrued Client(s)
              </p>
            </div>
          </div>
          </Card>
        </div>

        {/* Right panel */}
        <div>
          <Card className={clsx(styles.card, styles.prefs)} style={{background: '#F8F8F8'}}>
            <Tabs style={{background: 'white'}} tab={0} tabs={['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability']} />
          </Card>
        </div>
      </div>
    </>
  )
}