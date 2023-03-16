'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import { Business } from '@/types/Business';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import { sample_user } from '@/utility/sample_data/sample_user';
import { useMemo, useState } from 'react';
import styles from './tabs.module.scss';

interface PrefsProps {
  business: Business,
}

export const Prefs: React.FC<PrefsProps> = ({business}) => {

  const [toggle, setToggle] = useState<boolean>(false);
  
  return (
    <div className={styles.Prefs}>
      <p>General Business Prefs</p>
      <hr />

      <div className={styles.settings}>
        <Setting label='Business Photo'>
          <p>Business Photo</p>
        </Setting>
        <Setting label='Business Name'>
          <p>{business.name ?? 'None'}</p>
        </Setting>
        <Setting label='Business Email'>
          <p>{business.email ?? 'None'}</p>
        </Setting>
        <Setting label='Business Phone'>
          <p>{business.phone ?? 'None'}</p>
        </Setting>
      </div>
      
    </div>
  )
} 
