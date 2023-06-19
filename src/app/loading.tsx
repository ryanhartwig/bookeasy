import { LoadingSplash } from '@/components/UI/LoadingSplash/LoadingSplash';
import styles from './login/login.module.scss';

export default function Loading() {

  console.log('loading app user: ', process.env.USER);
  console.log('loading app vercel: ', process.env.VERCEL);
  
  return (
    <>
      <div className={styles.login}>
        <LoadingSplash loading />
      </div> 
    </>
  )
}