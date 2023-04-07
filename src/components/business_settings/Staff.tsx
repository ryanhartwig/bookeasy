import { Client } from "@/types/Client";
import { Service } from "@/types/Service";
import { User } from "@/types/User";

import styles from './tabs.module.scss';
import { useMemo } from "react";
import { Avatar } from "../UI/Avatar/Avatar";
import { UserMeta } from "@/utility/functions/fetch/business/getBusinessUserMeta";

interface StaffProps {
  members: User[],
  services: Service[],
  clients: Client[],
  meta: UserMeta[],
}

export const Staff: React.FC<StaffProps> = ({members, services, clients, meta}) => {
  
  const staff = useMemo(() => 
    members.map(m => (
      <div className={styles.client} key={m.id}>
        <div>
          <Avatar src={m.avatar} size={28} />
        </div>
        <div>
          <p>{m.name}</p>
          <p>{services.filter(s => s.userIds.includes(m.id)).length}</p>
          <p>{clients.filter(c => c.assignedUserIds.includes(m.id)).length}</p>
          <p>{new Date(meta.find(meta => meta.userId === m.id)!.dateAdded)
            .toLocaleDateString()}</p>
          <p className={styles.details}>Details</p>
        </div>
      </div> 
      )
    )
  , [clients, members, meta, services]);

  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Services', 'Clients', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
      </div>
      {staff}
    </div>
  )
}