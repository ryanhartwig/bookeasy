import styles from './clients.module.scss';

import { useEffect, useMemo, useState } from 'react';
import { Client } from '@/types/Client';
import { NewBusiness } from '@/types/Business';
import { useQuery } from '@apollo/client';
import { GET_USER_BUSINESSES } from '@/utility/queries/userQueries';
import { BusinessClientsList } from './businessClientsList';
import { ClientForm } from './clientForm/clientForm';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { LoadingDots } from '@/components/UI/LoadingDots/LoadingDots';

interface ClientsProps {
  selected: Client | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
  setSelectedBusiness: React.Dispatch<React.SetStateAction<NewBusiness | undefined>>,
  userId: string,
}

export const Clients: React.FC<ClientsProps> = ({selected, setSelected, userId, setSelectedBusiness}) => {
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
          <BusinessClientsList key={b.id} business={b} setSelectedBusiness={setSelectedBusiness} query={query} selected={selected} setSelected={setSelected} />
        )
      })
    )
  }, [businesses, query, selected, setSelected, setSelectedBusiness]);

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
      {loading
        ? <div className={styles.client_team}>
            <SectionLabel label={'Loading Clients'} />
            <LoadingDots style={{justifyContent: 'flex-start', marginLeft: 15}} />
          </div>
        : results
      }
      {formOpen && <ClientForm setSelected={setSelected} open={formOpen} setOpen={setFormOpen} userId={userId} onSubmit={() => setFormOpen(false)} />}
    </div>
  )
}