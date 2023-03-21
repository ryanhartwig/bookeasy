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
        {['Name', 'Appointments', 'Date Added', 'Active Client'].map(t => <p key={t}>{t}</p>)}
      </div>
      {clients.map(c => (
        <div className={styles.client} key={c.id}>
          <div>
            <Image src={c.avatar} alt="Client avatar" height={28} />
          </div>
          <div>
            <p>{c.name}</p>
            <p></p>
            <p>{new Date(c.created).toDateString().split(' ').slice(1).join(' ')}</p>
            <p>{c.active ? 'Yes' : 'No'}</p>
          </div>
        </div>
      ))}
    </div>
  )
}