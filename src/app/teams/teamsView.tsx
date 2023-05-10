'use client';

import { NewBusiness } from '@/types/Business';
import { useEffect, useRef, useState } from 'react';
import { TeamSelect } from './teamSelect';
import styles from './teams.module.scss';
import { useQuery } from '@apollo/client';
import { GET_USER_BUSINESSES } from '@/utility/queries/userQueries';
import { TeamDetails } from './teamDetails';

interface TeamsViewProps {
  userId: string,
}

export const TeamsView: React.FC<TeamsViewProps> = ({userId}) => {
  const [selected, setSelected] = useState<NewBusiness>();
  const [teams, setTeams] = useState<NewBusiness[]>([]);

  const { data: teamsData, loading: teamsDataLoading } = useQuery(GET_USER_BUSINESSES, { variables: { userId }});
  useEffect(() => {
    if (teamsDataLoading || !teamsData) return;
    setTeams(teamsData.getUserBusinesses.filter((b: NewBusiness) => !b.user_id)); // Remove user's own business
  }, [teamsData, teamsDataLoading]);

  // Update selected when data changes (due to cache update)
  const selectedId = useRef<string>('');
  useEffect(() => {
    if (!selected) return;
    if (selected.id === selectedId.current) {
      setSelected(teams.find(t => t.id === selectedId.current));
      return;
    }
    
    selectedId.current = selected.id;
  }, [selected, teams, teamsData]);

  return (
    <>
      <div className={styles.Teams}>
        <div className={styles.teams_section}>
          <p>My teams</p>
          <TeamSelect teams={teams} selected={selected} setSelected={setSelected} userId={userId} />
        </div>
        
        {selected && <TeamDetails business={selected} userId={userId} />}
      </div>
    </>
  )
}