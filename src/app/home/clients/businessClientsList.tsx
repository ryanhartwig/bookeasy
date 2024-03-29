import { Avatar } from '@/components/UI/Avatar/Avatar';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { GET_BUSINESS_CLIENTS } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { VscVerifiedFilled, VscUnverified } from 'react-icons/vsc';
import styles from './clients.module.scss';

interface BusinessClientsListProps {
  business: NewBusiness,
  selected: Client | undefined,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
  setSelectedBusiness: React.Dispatch<React.SetStateAction<NewBusiness | undefined>>,
  query: string,
}

export const BusinessClientsList: React.FC<BusinessClientsListProps> = ({business, selected, setSelected, query, setSelectedBusiness}) => {

  const [clients, setClients] = useState<Client[]>([]);

  const filteredClients = useMemo(() => clients
    // Filter by query (space-separated lazy search)
    .filter(c => 
      !query.length || 
      query.split(' ')
        .every(slice => c.name.toLowerCase().includes(slice.toLowerCase()))
    
    // Sort alphabetically
    ).sort((a, b) => a.name[0].toLowerCase() < b.name[0].toLowerCase() ? -1 : 1)
  , [clients, query]);

  const { data, loading } = useQuery(GET_BUSINESS_CLIENTS, { variables: {
    businessId: business.id,
  }});

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
            setSelectedBusiness(business)
          }}
        >
          <Avatar src={c.avatar} />
          <p>{c.name.length > 18 ? `${c.name.slice(0, 15)}...` : c.name}</p>
          <div className={clsx(styles.registeredIcon, {[styles.registered]: c.registered_user_id})}>
            {c.registered_user_id ? <VscVerifiedFilled fontSize={15} /> : <VscUnverified fontSize={15} />}
            <p className={styles.tooltip}>{c.registered_user_id ? 'Registered Client' : 'Unregistered'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}