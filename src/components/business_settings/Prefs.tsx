'use client';

import { Setting } from '@/components/UI/Setting/Setting';
import { Business } from '@/types/Business';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import { sample_user } from '@/utility/sample_data/sample_user';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { Avatar } from '../UI/Avatar/Avatar';
import styles from './tabs.module.scss';

interface PrefsProps {
  business: Business,
}

export const Prefs: React.FC<PrefsProps> = ({business}) => {

  return (
    <div className={styles.Prefs}>
      <div className={styles.header}>
        <p>General Business Prefs</p>
      </div>

      <div className={styles.settings}>
        <Setting label='Business Photo'>
          <Avatar src={business.photo} size={50} alt='Business logo' />
        </Setting>
        <Setting label='Business Name'>
          <p>{business.name}</p>
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
