'use client';

import { Client } from '@/types/Client';
import { useMemo } from 'react';
import { Avatar } from '../UI/Avatar/Avatar';
import styles from './tabs.module.scss';

interface ClientListProps {
  clients: Client[],
}

export const ClientList: React.FC<ClientListProps> = ({clients}) => {
  return <></>
  const clientApps = useMemo<Map<string, number>>(() => {
    const map = new Map<string, number>();
    
    sample_appointments.forEach(app => {
      map.set(app.clientId, map.get(app.id) ?? 0 + 1);
    });

    return map;
  }, []);

  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Appointments', 'Date Added', 'Active Client'].map(t => <p key={t}>{t}</p>)}
      </div>
      {clients.map(c => (
        <div className={styles.client} key={c.id}>
          <div>
            <Avatar src={c.avatar} size={28} />
          </div>
          <div>
            <p>{c.name}</p>
            <p>{clientApps.get(c.id) ?? 0}</p>
            <p>{new Date(c.created).toDateString().split(' ').slice(1).join(' ')}</p>
            <p>{c.active ? 'Yes' : 'No'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}
