'use client';

import { Clients } from './clients';
import { Details } from './details';
import styles from './clients.module.scss';
import { Client } from '@/types/Client';
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BUSINESS_CLIENTS } from '@/utility/queries/businessQueries';

interface ClientsViewProps {
  userId: string,
}

export const ClientsView: React.FC<ClientsViewProps> = ({userId}) => {
  const [selected, setSelected] = useState<Client>();



  return (
    <div className={styles.wrapper}>
      <Clients userId={userId} selected={selected} setSelected={setSelected}/>
      {/* {selected ? <Details selected={selected} appointments={appointments} services={services} />
        : <p style={{width: '100%', padding: 20, fontWeight: 300, fontSize: 14, color: 'grey'}}>Select a client to see details</p>} */}
    </div>
  )
}