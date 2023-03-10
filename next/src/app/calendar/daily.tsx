import { Card } from '@/components/UI/Card';
import { Hours } from '../dashboard/hours';
import styles from './daily.module.scss';

export const Daily = () => {

  return (
    <div className={styles.daily}>
      <Card className={styles.day_wrapper} >
        {/* <Hours  /> */}
      </Card>
    </div>
    
  )
}