import { Card } from '@/components/UI/Card';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_services } from '@/utility/sample_data/sample_services';
import { sample_user } from '@/utility/sample_data/sample_user';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './business.module.scss';

export default function Page() {
  return (
    <div className={styles.business}>
      {/* Left panels */}
      <div>
        <Card className={clsx(styles.card, styles.overview)}>
          <Image src={sample_user.avatar || ""} alt="User avatar" height={100} style={{margin: 15}} />
          <p className={styles.name}>{sample_user.name}</p>
          <hr />
          <div className={styles.details}>
            <div>
              <p>{sample_clients.filter(c => c.business_id === sample_user.id).length}</p>
              <p>clients</p>  
            </div>
            <div>
              <p>{sample_services.filter(s => s.business_id === sample_user.id).length}</p>
              <p>services</p>  
            </div>
          </div>
        </Card>
        <Card className={clsx(styles.card, styles.metrics)}>
          
        </Card>
      </div>

      {/* Right panel */}
      <div>
        <Card className={clsx(styles.card, styles.prefs)}>

        </Card>
      </div>
    </div>
  )
}