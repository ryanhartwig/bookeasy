import styles from './clients.module.scss';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import { Client } from '@/types/Client';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Business } from '@/types/Business';
import { BsPersonCircle } from 'react-icons/bs';
import { Avatar } from '@/components/UI/Avatar/Avatar';

interface ClientsProps {
  selected: Client | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
  clients: Client[],
  businesses: Business[],
}

export const Clients: React.FC<ClientsProps> = ({selected, setSelected, clients, businesses}) => {
  const [query, setQuery] = useState<string>('');

  const results = useMemo(() => {    
    return (
      businesses.map(b => {
        const filteredClients = clients
          // organize by team
          .filter(c => c.businessId === b.id)
          // space separated lazy search
          .filter(c => !query.length || query.split(' ').every(slice => c.name.toLowerCase().includes(slice.toLowerCase())))
        ;

        return (
          <div key={b.id} className={styles.client_team}>
            <SectionLabel label={b.name} />
            {filteredClients.map(c => (
              <div 
                key={c.id} 
                className={clsx(styles.client, {[styles.selected]: selected?.id === c.id})}
                onClick={() => {
                  setSelected(c);
                }}
              >
                <Avatar src={c.avatar} />
                <p>{c.name}</p>
              </div>
            ))}
          </div>
        )
      })
    )
    
  }, [businesses, clients, query, selected?.id, setSelected]);


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