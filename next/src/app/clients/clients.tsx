'use client';

import { SectionLabel } from '@/components/UI/SectionLabel';
import { useEffect, useMemo, useState } from 'react';
import styles from './clients.module.scss';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';

export const Clients = () => {

  const [query, setQuery] = useState<string>('');

  

  return (
    <div className={styles.clients}>
      {sample_businesses.map(b => {
        const clients = sample_clients.filter(c => c.business_id === b.id);
        
        return (
          <div key={b.id} className={styles.client_team}>
            <SectionLabel label={b.name} style={{marginLeft: 8}} />
            {clients.map(c => (
              <div key={c.id} className={styles.client}>

                <p>{c.name}</p>
              </div>
            ))}
          </div>
        )
      })}
    </div>
  )
}