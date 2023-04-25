import { Avatar } from '@/components/UI/Avatar/Avatar';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Business } from '@/types/Business';
import { Client } from '@/types/Client';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import styles from './clients.module.scss';

interface BusinessClientsListProps {
  business: Business,
  selected: Client | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
  query: string,
}

export const BusinessClientsList: React.FC<BusinessClientsListProps> = ({business, selected, setSelected, query}) => {

  const [clients, setClients] = useState<Client[]>([]);

  // space separated lazy search
  const filteredClients = useMemo(() => clients
    .filter(c => 
      !query.length || 
      query.split(' ')
        .every(slice => c.name.toLowerCase().includes(slice.toLowerCase()))
    )
  , [clients, query]);
  
  return (
    <div className={styles.client_team}>
      <SectionLabel label={business.name} />
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
}