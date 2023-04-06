'use client';

import { Business } from '@/types/Business';
import { useEffect, useState } from 'react';
import { TeamSelect } from './teamSelect';
import styles from './teams.module.scss';
import { User } from '@/types/User';
import { getBusinessClients } from '@/utility/functions/fetch/business/getBusinessClients';
import { getBusinessServices } from '@/utility/functions/fetch/business/getBusinessServices';
import { getBusinessMembers } from '@/utility/functions/fetch/business/getBusinessMembers';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { TeamDetails } from './teamDetails';
import { getBusinessUserMeta, UserMeta } from '@/utility/functions/fetch/business/getBusinessUserMeta';

interface TeamsViewProps {
  teams: Business[],
  currentUser: User,
}

export const TeamsView: React.FC<TeamsViewProps> = ({teams, currentUser}) => {

  const [selected, setSelected] = useState<Business>();

  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [members, setMembers] = useState<User[]>([]);
  const [meta, setMeta] = useState<UserMeta[]>([]);

  useEffect(() => {
    if (!selected) return;
    ;(async () => {
      const clientsPromise = getBusinessClients(selected.id);
      const servicesPromise = getBusinessServices(selected.id);
      const membersPromise = getBusinessMembers(selected.id);
      const metaPromise = getBusinessUserMeta(selected.id);
      
      try {
        const results = await Promise.all([
          clientsPromise, 
          servicesPromise,
          membersPromise, 
          metaPromise
        ]);
        const [clients, services, members, meta] = results;
        setClients(clients.data);
        setServices(services.data);
        setMembers(members.data);
        setMeta(meta.data)

      } catch(e) {
        console.log(e);
      }
    })()

    
  }, [selected]);
  
  
  return (
    <>
      <div className={styles.Teams}>
        <div className={styles.teams_section}>
          <p>My teams</p>
          <TeamSelect currentUser={currentUser} teams={teams} selected={selected} setSelected={setSelected} />
        </div>
        
        {selected && <TeamDetails business={selected} clients={clients} services={services} users={members} meta={meta}/>}
        
      </div>
    </>
  )
}