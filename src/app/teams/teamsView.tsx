'use client';

import { NewBusiness } from '@/types/Business';
import { useEffect, useState } from 'react';
import { TeamSelect } from './teamSelect';
import styles from './teams.module.scss';
import { useQuery } from '@apollo/client';
import { GET_USER_BUSINESSES } from '@/utility/queries/userQueries';

interface TeamsViewProps {
  userId: string,
}

export const TeamsView: React.FC<TeamsViewProps> = ({userId}) => {
  const [selected, setSelected] = useState<NewBusiness>();
  const [teams, setTeams] = useState<NewBusiness[]>([]);

  const { data: teamsData, loading: teamsDataLoading } = useQuery(GET_USER_BUSINESSES, { variables: { userId }});
  useEffect(() => teamsData && setTeams(teamsData.getUserBusinesses), [teamsData]);

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