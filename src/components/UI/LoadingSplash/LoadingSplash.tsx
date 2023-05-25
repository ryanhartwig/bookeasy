import React from 'react';
import styles from './splash.module.scss';
import Image from 'next/image';
import { Spinner } from '../Spinner/Spinner';
import * as bookit from '@/assets/logo_temp.svg';
import clsx from 'clsx';

interface LoadingSplashProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  loading?: boolean,
}

export const LoadingSplash: React.FC<LoadingSplashProps> = ({loading = false, ...props}) => {

  return (
    <div {...props} className={clsx(styles.loadingCover, props.className || '')}>
      <div className={styles.loadingSplash}>
        <div className={styles.logo}>
          <Image priority src={bookit.default} alt="Book it logo" />
          <p><span>book</span>easy.</p>
        </div>
        {loading && <div className={styles.loadingSpinner} >
          <Spinner style={{position: 'relative', top: 15, left: 5}} />
        </div>}
      </div>
    </div> 
  )
}