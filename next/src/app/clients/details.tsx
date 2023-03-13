import { Card } from '@/components/UI/Card';
import { Client } from '@/types/Client';
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
          <Card className={styles.card} style={{height: 444}}>
            
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