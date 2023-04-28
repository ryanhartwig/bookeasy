'use client';

import { Clients } from './clients';
import { Details } from './details';
import styles from './clients.module.scss';
import { Client } from '@/types/Client';
import React, { useState } from 'react';
import { NewBusiness } from '@/types/Business';

interface ClientsViewProps {
  userId: string,
}

export const ClientsView: React.FC<ClientsViewProps> = ({userId}) => {
  const [selected, setSelected] = useState<Client>();
  const [selectedBusiness, setSelectedBusiness] = useState<NewBusiness>();

  return (
    <div className={styles.wrapper}>
      <Clients userId={userId} selected={selected} setSelected={setSelected} setSelectedBusiness={setSelectedBusiness}/>
      
      {selected && selectedBusiness ? <Details selected={selected} setSelected={setSelected} selectedBusiness={selectedBusiness} userId={userId} />
        : <p style={{width: '100%', padding: 20, fontWeight: 300, fontSize: 14, color: 'grey'}}>Select a client to see details</p>}
    </div>
  )
}