import styles from './clients.module.scss';

import { useMemo, useState } from 'react';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import Image from 'next/image';
import clsx from 'clsx';
import { Client } from '@/types/Client';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';

interface ClientsProps {
  selected: Client | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
}

export const Clients: React.FC<ClientsProps> = ({selected, setSelected}) => {

  const [query, setQuery] = useState<string>('');

  const results = useMemo(() => {    
    return (
      sample_businesses.map(b => {
        const clients = sample_clients
          // organize by team
          .filter(c => c.business_id === b.id)
          // space separated lazy search
          .filter(c => !query.length || query.split(' ').every(slice => c.name.toLowerCase().includes(slice.toLowerCase())))
        ;
        
        return (
          <div key={b.id} className={styles.client_team}>
            <SectionLabel label={b.name} />
            {clients.map(c => (
              <div 
                key={c.id} 
                className={clsx(styles.client, {[styles.selected]: selected?.id === c.id})}
                onClick={(e) => {
                  setSelected(c);
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
    
  }, [query, selected?.id, setSelected]);


  return (
    <div className={styles.clients}>
      <input 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        className={styles.input}
        placeholder='Search by client...'
      />
      {results}
    </div>
  )
}