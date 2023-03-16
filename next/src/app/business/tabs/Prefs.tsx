'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import { useState } from 'react';
import styles from './tabs.module.scss';

export const Prefs = () => {

  const [toggle, setToggle] = useState<boolean>(false);
  
  return (
    <div className={styles.Prefs}>
      <p>General Business Prefs</p>
      <hr />

      <Setting label='Test' toggleState={toggle} onAction={() => {
        console.log('clicked')
        setToggle(p => !p);
      }} />
    </div>
  )
} 
