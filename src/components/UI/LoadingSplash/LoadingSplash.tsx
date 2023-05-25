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

  const bookeasy = ['b', 'o', 'o', 'k', 'e', 'a', 's', 'y'].reverse();

  return (
    <div {...props} className={clsx(styles.loadingCover, props.className || '')}>
      <div className={styles.loadingSplash}>
        <div className={styles.logo}>
          <Image className={clsx({[styles.outright]: !loading})} 
            priority 
            style={{animationDelay: '200ms'}}
            src={bookit.default} 
            alt="Book it logo" 
          />
          <p>
            {bookeasy.map((c, i) => 
              <span className={clsx({[styles.outright]: !loading})} style={{animationDelay: `${(i * 25)}ms`}}
                key={`${c}${i}`}
              >{c}</span>
            )}
          </p>
        </div>
        {loading && <div className={styles.loadingSpinner} >
          <Spinner style={{position: 'relative', top: 15, left: 5}} />
        </div>}
      </div>
    </div> 
  )
}