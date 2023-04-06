import Image from 'next/image';
import styles from './teams.module.scss';

import addTeam from '../../../public/assets/team_add.svg';
import teamDefault from '../../../public/assets/team_default.svg';
import { Card } from '@/components/UI/Card/Card';
import clsx from 'clsx';
import { Business } from '@/types/Business';
import { useMemo } from 'react';
import { User } from '@/types/User';

interface TeamsProps {
  selected?: Business,
  setSelected: React.Dispatch<React.SetStateAction<Business | undefined>>,
  teams: Business[],
  currentUser: User,
}

export const TeamSelect: React.FC<TeamsProps> = ({selected, setSelected, teams: allTeams, currentUser}) => {

  const teams = useMemo(() => allTeams.filter(t => t.id !== currentUser.ownBusinessId), [allTeams, currentUser.ownBusinessId]);
  
  return (
    <div className={styles.user_teams}>
      {/* Teams user belongs to */}
      {teams.map(t => (
        <Card key={t.id} 
          className={clsx(styles.team, {[styles.selected]: selected && selected.id === t.id})}
          onClick={() => setSelected(t)}
        >
          <p>{t.name}</p>
          <Image src={teamDefault} alt='Add team icon' />
        </Card>
      ))}

      {/* Create team */}
      <div className={styles.create_team}>
        <p>Create Team</p>
        <Image src={addTeam} alt='Add team icon' className={styles.create_team_icon} />
      </div>
    </div>
  )
}