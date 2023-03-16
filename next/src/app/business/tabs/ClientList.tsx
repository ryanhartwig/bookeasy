'use client';

import { Client } from '@/types/Client';
import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import Image from 'next/image';
import { useMemo } from 'react';
import styles from './tabs.module.scss';

interface ClientListProps {
  clients: Client[],
}

export const ClientList: React.FC<ClientListProps> = ({clients}) => {

  const clientApps = useMemo<Map<string, number>>(() => {
    const map = new Map<string, number>();
    
    sample_appointments.forEach(app => {
      map.set(app.client_id, map.get(app.id) ?? 0 + 1);
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
            <Image src={c.avatar} alt="Client avatar" height={28} />
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
