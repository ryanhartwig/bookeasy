import { Card } from '@/components/UI/Card';
import { Client } from '@/types/Client';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './clients.module.scss';

interface DetailsProps {
  selected: Client | undefined,
}

export const Details: React.FC<DetailsProps> = ({selected}) => {

  return (
    <div className={styles.details}>
      {selected ? 
      <>
        <div>
          {/* Client photo, name, contact info, notes */}
          <Card className={clsx(styles.card, styles.client_details)} style={{height: 444}}>
            {selected.avatar && 
              <Image src={selected.avatar} alt="Client avatar" style={{width: 115, height: 115}} />
            }
            <p className={styles.client_name}>{selected.name}</p>
            <hr />
            <div className={styles.client_contact}>
              <div>
                <p className={styles.label}>phone</p>
                <p>{selected.phone}</p>
              </div>
              <div>
                <p className={styles.label}>email</p>
                <p>{selected.email}</p>
              </div>
              <div>
                <p className={styles.label}>address</p>
                <p>{selected.address}</p>
              </div>
            </div>
            <p className={styles.label} style={{width: '95%', marginTop: 5}}>notes</p>
            <div className={styles.notes}>
              <p>{selected.notes}</p>
            </div>
            <p className={styles.edit}>Edit</p>
          </Card>

          {/* Client metrics (total appointments, calculated revenue, etc) */}
          <Card className={clsx(styles.card, styles.metrics)} style={{height: 272}}>
            <div className={styles.metric}>
                <p>n</p>
                <p className={styles.label}>Past Appointments</p>
              </div>
              <hr />
              <div className={styles.metric}>
                <p>n</p>
                <p className={styles.label}>Cancelled Appointments</p>
              </div>
              <hr />
              <div className={styles.metric}>
                <p>n</p>
                <p className={styles.label}>Total Calculated Revenue</p>
              </div>
              <hr />
              <div className={styles.metric}>
                <p>n</p>
                <p className={styles.label}>Unpaid</p>
              </div>  
          </Card>
        </div>
        <div>
          <Card className={styles.card} style={{height: 736}}>
            
          </Card>
        </div>
      </>
    : <p style={{fontWeight: 100, margin: 10}}>Select a client to see details.</p>}
      
    </div>
  )
}