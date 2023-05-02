import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { User } from '@/types/User';
import clsx from 'clsx';
import styles from './business.module.scss';
import { Metrics } from './metrics';
import { Settings } from './settings';

interface BusinessProps {
  user: User,
  clients: Client[],
  services: Service[],
  availability: AvailabilitySlice[],
  business: NewBusiness,
}

export const Business: React.FC<BusinessProps> = ({user, clients, services, availability, business}) => {


  return (
    <div className={styles.business}>
      {/* Left panels */}
      <div>    
        <Card className={clsx(styles.card, styles.overview)}>
          
          <Avatar src={user.avatar} size={100} style={{margin: 15}} />
          <p className={styles.name}>{user.name}</p>
          <hr />
          <div className={styles.details}>
            <div>
              <p>{clients.length}</p>
              <p>client(s)</p>  
            </div>
            <div>
              <p>{services.length}</p>
              <p>service(s)</p>  
            </div>
          </div>
        </Card>
        <Card className={clsx(styles.card, styles.metrics)}>
          {user && <Metrics user={user} />}
        </Card>
      </div>

      {/* Right panel */}
      <div>
        <Card className={clsx(styles.card, styles.prefs)}>
          <Settings business={business} clients={clients} services={services} user={user} availability={availability} />
        </Card>
      </div>
    </div>
  )
}