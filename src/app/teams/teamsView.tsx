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

interface TeamsViewProps {
  teams: Business[],
  currentUser: User,
}

export const TeamsView: React.FC<TeamsViewProps> = ({teams, currentUser}) => {

  const [selected, setSelected] = useState<Business>();

  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [members, setMembers] = useState<User[]>([]);

  useEffect(() => {
    if (!selected) return;
    ;(async () => {
      const clients = getBusinessClients(selected.id);
      const services = getBusinessServices(selected.id);
      const members = getBusinessMembers(selected.id);
      
      try {
        const results = await Promise.all([clients, services, members]);
        const [c, s, m] = results;
        setClients(c.data);
        setServices(s.data);
        setMembers(m.data);

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
        
        {selected && <TeamDetails business={selected} clients={clients} services={services} users={members} />}
        
      </div>
    </>
  )
}