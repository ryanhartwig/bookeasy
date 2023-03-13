import { Card } from '@/components/UI/Card';
import styles from './clients.module.scss';

export const Details = () => {

  return (
    <div className={styles.details}>
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
    </div>
  )
}