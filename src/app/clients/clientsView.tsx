'use client';

import { Clients } from './clients';
import { Details } from './details';
import styles from './clients.module.scss';
import { Client } from '@/types/Client';
import React, { useState } from 'react';
import { Business } from '@/types/Business';
import { Appointment } from '@/types/Appointment';
import { Service } from '@/types/Service';

interface ClientsViewProps {
  clients: Client[],
  businesses: Business[],
  appointments: Appointment[],
  services: Service[],
}

export const ClientsView: React.FC<ClientsViewProps> = ({clients, businesses, appointments, services}) => {
  const [selected, setSelected] = useState<Client>();

  return (
    <div className={styles.wrapper}>
      <Clients selected={selected} setSelected={setSelected} clients={clients} businesses={businesses} />
      {selected ? <Details selected={selected} appointments={appointments} services={services} />
        : <p style={{width: '100%', padding: 20, fontWeight: 300, fontSize: 14, color: 'grey'}}>Select a client to see details</p>}
    </div>
  )
}