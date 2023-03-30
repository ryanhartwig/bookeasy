'use client';

import { Client } from "@/types/Client";
import { Service } from "@/types/Service";
import { User } from "@/types/User";

import styles from './tabs.module.scss';
import Image from 'next/image';
import { useMemo } from "react";

interface StaffProps {
  members: User[],
  services: Service[],
  clients: Client[],
}

export const Staff: React.FC<StaffProps> = ({members, services, clients}) => {
  
  const staff = useMemo(() => 
    members.map(m => (
      <div className={styles.client} key={m.id}>
        <div>
          <Image src={m.avatar || ''} alt="Member avatar" height={28} />
        </div>
        <div>
          <p>{m.name}</p>
          <p>{services.filter(s => s.userIds.includes(m.id)).length}</p>
          <p>{clients.filter(c => c.assigned_users.includes(m.id)).length}</p>
          <p>{new Date(m.created).toDateString().split(' ').slice(1).join(' ')}</p>
          <p className={styles.details}>Details</p>
        </div>
      </div> 
      )
    )
  , [clients, members, services]);

  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Services', 'Clients', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
      </div>
      {staff}
    </div>
  )
}