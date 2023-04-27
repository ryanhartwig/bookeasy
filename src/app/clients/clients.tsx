import styles from './clients.module.scss';

import { useEffect, useMemo, useState } from 'react';
import { Client } from '@/types/Client';
import { NewBusiness } from '@/types/Business';
import { useQuery } from '@apollo/client';
import { GET_USER_BUSINESSES } from '@/utility/queries/userQueries';
import { BusinessClientsList } from './businessClientsList';
import { ClientForm } from './clientForm/clientForm';

interface ClientsProps {
  selected: Client | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
  userId: string,
}

export const Clients: React.FC<ClientsProps> = ({selected, setSelected, userId}) => {
  const [query, setQuery] = useState<string>('');

  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);
  const [formOpen, setFormOpen] = useState<boolean>(false);

  const { data, loading } = useQuery(GET_USER_BUSINESSES, { variables: {
    userId,
  }});

  useEffect(() => {
    if (!data ||loading) return;
    setBusinesses(data.getUserBusinesses);
  }, [data, loading]);

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
      <div className={styles.addClient} onClick={() => setFormOpen(true)}>
        <p>+</p>
        <p>Add Client</p>
      </div>
      {results}
      {formOpen && <ClientForm open={formOpen} setOpen={setFormOpen} userId={userId} onSubmit={() => setFormOpen(false)} />}
    </div>
  )
}