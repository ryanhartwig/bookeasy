'use client';

import { Client } from '@/types/Client';
import { ClientDetails } from './ClientDetails';
import styles from './tabs.module.scss';

interface ClientListProps {
  clients: Client[],
}

export const ClientList: React.FC<ClientListProps> = ({clients}) => {

  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Appointments', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
      </div>
      {clients.map(c => (
        <ClientDetails key={c.id} client={c} />
      ))}
    </div>
  )
}
