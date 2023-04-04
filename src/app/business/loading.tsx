import { Header } from '@/components/Header';
import { Card } from '@/components/UI/Card/Card';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import clsx from 'clsx';
import styles from './business.module.scss';

export default async function Page() {
  
  return (
    <>
      <Header text='My Business' />
      <div className={styles.business}>
        {/* Left panels */}
        <div>    
          <Card className={clsx(styles.card, styles.overview)} >
            <p className={styles.name} style={{marginTop: 150}}>Loading...</p>
            <hr />
            <div className={styles.details}>
              <div>
                <p>0</p>
                <p>client(s)</p>  
              </div>
              <div>
                <p>0</p>
                <p>service(s)</p>  
              </div>
            </div>
          </Card>
          <Card className={clsx(styles.card, styles.metrics)}>
            <p style={{marginTop: 15}}>Loading...</p>
          </Card>
        </div>

        {/* Right panel */}
        <div>
          <Card className={clsx(styles.card, styles.prefs)}>
            <Tabs tab={0} tabs={['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability']} />
          </Card>
        </div>
      </div>
    </>
  )
}