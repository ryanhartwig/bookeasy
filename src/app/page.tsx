import { LoadingSplash } from '@/components/UI/LoadingSplash/LoadingSplash';
import styles from './login/login.module.scss';

export default function Page() {
  return (
    <>
      <div className={styles.login}>
        <LoadingSplash loading />
      </div> 
    </>
  )
}