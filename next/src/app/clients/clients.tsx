'use client';

import styles from './clients.module.scss';

import { SectionLabel } from '@/components/UI/SectionLabel';
import { useEffect, useMemo, useState } from 'react';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import Image from 'next/image';
import clsx from 'clsx';

export const Clients = () => {

  const [query, setQuery] = useState<string>('');
  const [selected, setSelected] = useState<string>('');

  const results = useMemo(() => {    
    return (
      sample_businesses.map(b => {
        const clients = sample_clients
          // organize by team
          .filter(c => c.business_id === b.id)
          // space separated lazy search
          .filter(c => !query.length || query.split(' ').every(slice => c.name.includes(slice)))
        ;
        
        return (
          <div key={b.id} className={styles.client_team}>
            <SectionLabel label={b.name} />
            {clients.map(c => (
              <div 
                key={c.id} 
                className={clsx(styles.client, {[styles.selected]: selected === c.id})}
                onClick={(e) => {
                  setSelected(c.id);
                }}
              >
                {c.avatar && <Image alt="client avatar" src={c.avatar} style={{width: 30, height: 30}} />}
                <p>{c.name}</p>
              </div>
            ))}
          </div>
        )
      })
    )
    
  }, [query, selected]);


  return (
    <div className={styles.clients}>
      {results}
    </div>
  )
}