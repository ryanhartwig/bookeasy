'use client';

import { Business, NewBusiness } from '@/types/Business';
import { useEffect, useState } from 'react';
import { TeamSelect } from './teamSelect';
import styles from './teams.module.scss';
import { User } from '@/types/User';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { TeamDetails } from './teamDetails';

interface TeamsViewProps {
  userId: string,
}

export const TeamsView: React.FC<TeamsViewProps> = ({userId}) => {
  const [selected, setSelected] = useState<NewBusiness>();
  const [teams, setTeams] = useState<NewBusiness[]>([]);

  return (
    <>
      <div className={styles.Teams}>
        <div className={styles.teams_section}>
          <p>My teams</p>
          <TeamSelect teams={teams} selected={selected} setSelected={setSelected} />
        </div>
        
        {/* {selected && <TeamDetails business={selected} clients={clients} services={services} users={members} meta={meta}/>} */}
        
      </div>
    </>
  )
}