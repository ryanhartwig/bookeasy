'use client';

import { Client } from "@/types/Client";
import { Service } from "@/types/Service";
import { User } from "@/types/User";

import styles from './tabs.module.scss';
import Image from 'next/image';

interface StaffProps {
  members: User[],
  services: Service[],
  clients: Client[],
}

export const Staff: React.FC<StaffProps> = ({members, services, clients}) => {
  
  

  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Services', 'Clients', 'Date Added'].map(t => <p key={t}>{t}</p>)}
      </div>
      {members.map(m => (
        <div className={styles.client} key={m.id}>
          <div>
            <Image src={m.avatar || ''} alt="Member avatar" height={28} />
          </div>
          <div>
            <p>{m.name}</p>
            <p>{services.filter(s => s.user_ids.includes(m.id)).length}</p>
            <p></p>
            <p>{new Date(m.created).toDateString().split(' ').slice(1).join(' ')}</p>
          </div>
        </div>
      ))}
    </div>
  )
}