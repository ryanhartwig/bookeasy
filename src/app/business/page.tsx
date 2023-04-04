import { Header } from '@/components/Header';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { getAllClients } from '@/utility/functions/fetch/getAllClients';
import { getAllServices } from '@/utility/functions/fetch/getAllServices';
import { getUser } from '@/utility/functions/fetch/getUserDetails';
import { sample_user } from '@/utility/sample_data/sample_user';
import { userId } from '@/utility/sample_data/sample_userId';
import clsx from 'clsx';
import styles from './business.module.scss';
import { Metrics } from './metrics';
import { Settings } from './settings';

export default async function Page() {
  
  const { data: clients } = await getAllClients(userId);
  const { data: services } = await getAllServices(userId);
  const { data: user } = await getUser(userId);

  if (!user) return <></>

  return (
    <>
      <Header text='My Business' />
      <div className={styles.business}>
        {/* Left panels */}
        <div>    
          <Card className={clsx(styles.card, styles.overview)}>
            
            <Avatar src={user.avatar} size={100} style={{margin: 15}} />
            <p className={styles.name}>{user.name}</p>
            <hr />
            <div className={styles.details}>
              <div>
                <p>{clients.filter(c => c.businessId === sample_user.id).length}</p>
                <p>client(s)</p>  
              </div>
              <div>
                <p>{services.filter(s => s.businessId === sample_user.id).length}</p>
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
            <Settings />
          </Card>
        </div>
      </div>
    </>
  )
}