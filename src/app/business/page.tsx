import { Header } from '@/components/Header';
import { Card } from '@/components/UI/Card/Card';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_services } from '@/utility/sample_data/sample_services';
import { sample_user } from '@/utility/sample_data/sample_user';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './business.module.scss';
import { Metrics } from './metrics';
import { Settings } from './settings';

export default function Page() {
  return (
    <>
      <Header text='My Business' />
      <div className={styles.business}>
        {/* Left panels */}
        <div>
          <Card className={clsx(styles.card, styles.overview)}>
            <Image src={sample_user.avatar || ""} alt="User avatar" height={100} style={{margin: 15}} />
            <p className={styles.name}>{sample_user.name}</p>
            <hr />
            <div className={styles.details}>
              <div>
                <p>{sample_clients.filter(c => c.businessId === sample_user.id).length}</p>
                <p>client(s)</p>  
              </div>
              <div>
                <p>{sample_services.filter(s => s.businessId === sample_user.id).length}</p>
                <p>service(s)</p>  
              </div>
            </div>
          </Card>
          <Card className={clsx(styles.card, styles.metrics)}>
            <Metrics user={sample_user} />
          </Card>
        </div>

        {/* Right panel */}
        <div>
          <Card className={clsx(styles.card, styles.prefs)}>
            <Settings />
          </Card>
        </div>
      </div>
    </>
  )
}