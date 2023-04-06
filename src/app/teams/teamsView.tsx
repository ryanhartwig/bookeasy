'use client';

import { Business } from '@/types/Business';
import { useEffect, useState } from 'react';
import { TeamSelect } from './teamSelect';
import styles from './teams.module.scss';
import { User } from '@/types/User';
import { useQuery } from '@apollo/client';
import { getClient } from '@/utility/functions/getClient';
import { getBusinessClients } from '@/utility/functions/fetch/business/getBusinessClients';

interface TeamsViewProps {
  teams: Business[],
  currentUser: User,
}

export const TeamsView: React.FC<TeamsViewProps> = ({teams, currentUser}) => {

  const [selected, setSelected] = useState<Business>();
  const client = getClient();


  useEffect(() => {
    if (!selected) return;
    ;(async () => {
      const clients = getBusinessClients(selected.id);
      
      try {
        const results = await Promise.all([clients]);


        console.log(results);
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
        
        
      </div>
    </>
  )
}