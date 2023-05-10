import Image from 'next/image';
import styles from './teams.module.scss';

import addTeam from '../../../public/assets/team_add.svg';
import { Card } from '@/components/UI/Card/Card';
import clsx from 'clsx';
import { NewBusiness } from '@/types/Business';
import { useState } from 'react';
import { AddTeamForm } from './teamForm/addTeamForm';
import { Avatar } from '@/components/UI/Avatar/Avatar';

interface TeamsProps {
  selected?: NewBusiness,
  setSelected: React.Dispatch<React.SetStateAction<NewBusiness | undefined>>,
  teams: NewBusiness[],
  userId: string,
}

export const TeamSelect: React.FC<TeamsProps> = ({selected, setSelected, teams, userId}) => {

  const [teamsFormOpen, setTeamsFormOpen] = useState<boolean>(false);
  
  return (
    <div className={styles.user_teams}>
      {/* Teams user belongs to */}
      {teams.map(t => (
        <Card key={t.id} 
          className={clsx(styles.team, {[styles.selected]: selected && selected.id === t.id})}
          onClick={() => setSelected(t)}
        >
          <p>{t.name}</p>
          <Avatar src={t.avatar} size={70} useTeamIcon />
        </Card>
      ))}

      {/* Create team */}
      <div className={styles.create_team} onClick={() => setTeamsFormOpen(true)}> 
        <p>Create Team</p>
        <Image src={addTeam} alt='Add team icon' className={styles.create_team_icon} />
      </div>

      <AddTeamForm open={teamsFormOpen} onClose={() => setTeamsFormOpen(false)} setSelected={setSelected} userId={userId} />
    </div>
  )
}