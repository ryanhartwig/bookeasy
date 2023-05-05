'use client';

import { ClientForm } from '@/app/clients/clientForm/clientForm';
import { NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { ClientDetails } from './ClientDetails';
import styles from './tabs.module.scss';

interface ClientListProps {
  clients: Client[],
  business: NewBusiness,
}

export const ClientList: React.FC<ClientListProps> = ({clients, business}) => {

  const [selectedClient, setSelectedClient] = useState<Client>();
  const [open, setOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!selectedClient) return;
    setOpen(true);
  }, [selectedClient]);

  useEffect(() => {
    if (open) return;
    setSelectedClient(undefined);
  }, [open]);
  
  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Appointments', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
      </div>
      {clients.map(c => (
        <ClientDetails key={c.id} client={c} setSelectedClient={setSelectedClient} />
      ))}
      {open && <ClientForm initialBusiness={{id: business.id, name: business.name}} open={open} setOpen={setOpen} initialClient={selectedClient} onSubmit={() => setSelectedClient(undefined)} />}
      <div className={styles.addService} onClick={() => setOpen(true)}>
        <AiOutlinePlus fontSize={18} />
      </div>
    </div>
  )
}
