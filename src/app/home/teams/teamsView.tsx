'use client';

import { NewBusiness } from '@/types/Business';
import { useEffect, useRef, useState } from 'react';
import { TeamSelect } from './teamSelect';
import styles from './teams.module.scss';
import { useQuery } from '@apollo/client';
import { GET_USER, GET_USER_BUSINESSES } from '@/utility/queries/userQueries';
import { TeamDetails } from './teamDetails';
import { useUser } from '@/app/Providers';

export const TeamsView = () => {
  const { id: userId } = useUser();
  
  const [selected, setSelected] = useState<NewBusiness>();
  const [teams, setTeams] = useState<NewBusiness[]>([]);

  const { data: userData } = useQuery(GET_USER, { variables: { userId }});
  const { data: teamsData, loading: teamsDataLoading } = useQuery(GET_USER_BUSINESSES, { variables: { userId }, skip: !userData});
  useEffect(() => {
    if (teamsDataLoading || !teamsData) return;
    setTeams(teamsData.getUserBusinesses.filter((b: NewBusiness) => b.id !== userData.getUser.business_id)); // Remove user's own business
  }, [teamsData, teamsDataLoading, userData.getUser.business_id]);

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
        
        {selected && <TeamDetails business={selected} setSelectedBusiness={setSelected} userId={userId} />}
      </div>
    </>
  )
}