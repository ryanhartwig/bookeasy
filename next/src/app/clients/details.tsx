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
          <Card className={clsx(styles.card, styles.client_details)} style={{height: 444}}>
            {selected.avatar && 
              <Image src={selected.avatar} alt="Client avatar" style={{width: 115, height: 115}} />
            }
            <p className={styles.client_name}>{selected.name}</p>
            <hr />
            <div className={styles.client_contact}>

            </div>
          </Card>
          <Card className={styles.card} style={{height: 272}}>
            
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