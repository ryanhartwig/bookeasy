'use client';

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './dashboard.module.scss';
import { Hours } from './hours';

import { sample_appointments } from '@/sample_data/sample_appointments';
import { useDebouncedCallback } from 'use-debounce';

export const Hourly = () => {

  const days = Array(7).fill(true);
  const hourlyRef = useRef<HTMLDivElement>(undefined!);

  const [width, setWidth] = useState<string>('');
  const [wrapperWidth, setWrapperWidth] = useState<string>('100%');

  const wrapperRef = useRef<HTMLDivElement>(undefined!);
  const pauseResize = useCallback(() => {
    if (wrapperWidth !== '100%') return;
    setWrapperWidth(`${wrapperRef.current.offsetWidth}px`);
  }, [wrapperWidth]);

  const widen = useDebouncedCallback(() => {
    setWrapperWidth('100%');
  }, 200);

  useEffect(() => {
    setWidth(`calc(100% + ${hourlyRef.current.offsetWidth - hourlyRef.current.clientWidth}px)`);

    window.addEventListener('resize', widen);
    window.addEventListener('resize', pauseResize);

    return () => {
      window.removeEventListener('resize', widen);
      window.removeEventListener('resize', pauseResize);
    }

  }, [pauseResize, widen]);

  
  
  return (
    <div className={styles.hourlywrapper} ref={wrapperRef} style={{width: wrapperWidth}}>
      <div className={styles.hourly} ref={hourlyRef} style={{width}}>
        {days.map((_, i) => {
          return <Hours key={i} day={i} appointments={[]} />
        })}
      </div>
    </div>
  )
}