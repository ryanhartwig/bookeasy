import styles from './dashboard.module.scss';
import { Hours } from './hours';

export const Hourly = () => {

  const days = Array(7).fill(true);
  
  return (
    <div className={styles.hourly}>
      {days.map((_, i) => {

        return <Hours key={i} />
      })}
    </div>
  )
}