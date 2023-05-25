import styles from './login/login.module.scss';
import Image from 'next/image';
import * as bookit from '@/assets/logo_temp.svg';
import { Spinner } from '@/components/UI/Spinner/Spinner';

export default function Page() {
  return (
    <>
      <div className={styles.login}>
        <div className={styles.loadingSplash}>
          <div className={styles.logo} style={{position: 'static'}}>
            <Image className='Navigator_logo_icon' priority src={bookit.default} alt="Book it logo" />
            <p style={{position: 'relative', right: 10}}><span>book</span>easy.</p>
          </div>
          <div className={styles.loadingSpinner} >
            <Spinner style={{position: 'relative', top: 15, left: 5}} />
          </div>
        </div>
        
      </div> 
    </>
  )
}