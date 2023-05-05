import Image from 'next/image';
import styles from './teams.module.scss';

import addTeam from '../../../public/assets/team_add.svg';
import teamDefault from '../../../public/assets/team_default.svg';
import { Card } from '@/components/UI/Card/Card';
import clsx from 'clsx';
import { Business, NewBusiness } from '@/types/Business';
import { User } from '@/types/User';

interface TeamsProps {
  selected?: NewBusiness,
  setSelected: React.Dispatch<React.SetStateAction<NewBusiness | undefined>>,
  teams: NewBusiness[],
}

export const TeamSelect: React.FC<TeamsProps> = ({selected, setSelected, teams}) => {

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