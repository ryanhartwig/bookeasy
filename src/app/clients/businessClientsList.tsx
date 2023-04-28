import { Avatar } from '@/components/UI/Avatar/Avatar';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { GET_BUSINESS_CLIENTS } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import styles from './clients.module.scss';

interface BusinessClientsListProps {
  business: NewBusiness,
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

  const { data, loading } = useQuery(GET_BUSINESS_CLIENTS, { variables: {
    businessId: business.id,
  }});

  console.log('selected client:', selected);

  useEffect(() => {
    if (!data || loading) return;
    setClients(data.getBusinessClients)
  }, [data, loading]);
  
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
          {/* <p>{c.name.length > 20 ? `${c.name.slice(0, 17)}...` : c.name}</p> */}
        </div>
      ))}
    </div>
  )
}