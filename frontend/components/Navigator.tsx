import styles from '@/styles/Home.module.css';

import Image from 'next/image';
import * as bookit from '@/assets/logo_temp.svg';

import Link from 'next/link';

export const Navigator = () => {
  

  return (
    <div className={styles.Navigator}>
      <div className={styles.Navigator_logo}>
        <Image className={styles.Navigator_logo_icon} src={bookit} alt="Book it logo" />
        <span><Link href="/home/dashboard">book it.</Link></span>
      </div>
    </div>
  )
}