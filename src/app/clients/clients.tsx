import styles from './clients.module.scss';

import { useMemo, useState } from 'react';
import { Client } from '@/types/Client';
import { Business } from '@/types/Business';
import { useQuery } from '@apollo/client';
import { GET_USER_BUSINESSES } from '@/utility/queries/userQueries';
import { BusinessClientsList } from './businessClientsList';

interface ClientsProps {
  selected: Client | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
  userId: string,
}

export const Clients: React.FC<ClientsProps> = ({selected, setSelected, userId}) => {
  const [query, setQuery] = useState<string>('');

  const [businesses, setBusinesses] = useState<Business[]>([]);

  const { data, loading } = useQuery(GET_USER_BUSINESSES, { variables: {
    userId,
  }});

  const results = useMemo(() => {    
    return (
      businesses.map(b => {
        return (
          <BusinessClientsList key={b.id} business={b} query={query} selected={selected} setSelected={setSelected} />
        )
      })
    )
  }, [businesses, query, selected, setSelected]);

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