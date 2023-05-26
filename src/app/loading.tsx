import { LoadingSplash } from '@/components/UI/LoadingSplash/LoadingSplash';
import styles from './login/login.module.scss';

export default function Loading() {
  return (
    <>
      <div className={styles.login}>
        <LoadingSplash loading />
      </div> 
    </>
  )
}