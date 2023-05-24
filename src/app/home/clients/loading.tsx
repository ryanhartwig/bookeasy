import { Header } from '@/components/Header';
import styles from './clients.module.scss';
import { LoadingDots } from '@/components/UI/LoadingDots/LoadingDots';

export default function Loading() {
  return (
    <>
      <Header text='Clients' loading />
      <div className={styles.wrapper}>
        <div className={styles.clients}>
          <input 
            value={''} 
            className={styles.input}
            placeholder='Search by client...'
          />
          <div className={styles.addClient}>
            <p></p>
            <LoadingDots style={{padding: 5}}/>
          </div>

          <LoadingDots style={{margin: 10, justifyContent: 'flex-start'}} />
        </div>

        <p style={{width: '100%', padding: 20, fontWeight: 300, fontSize: 14, color: 'grey'}}>Select a client to see details</p>
      </div>
    </>
  )
}