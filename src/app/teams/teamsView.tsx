'use client';

import { Business } from '@/types/Business';
import { useState } from 'react';
import { TeamSelect } from './teamSelect';
import styles from './teams.module.scss';
import { User } from '@/types/User';

interface TeamsViewProps {
  teams: Business[],
  currentUser: User,
}

export const TeamsView: React.FC<TeamsViewProps> = ({teams, currentUser}) => {

  const [selected, setSelected] = useState<Business>();
  
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