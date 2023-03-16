import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

export const Prefs = () => {

  return (
    <div className={styles.Prefs}>
      <p>General Business Prefs</p>
      <hr />

      <Setting label='Test' />
    </div>
  )
} 
