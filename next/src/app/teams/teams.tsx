'use client';

import Image from 'next/image';
import styles from './teams.module.scss';

import addTeam from '../../../public/assets/team_add.svg';
import teamDefault from '../../../public/assets/team_default.svg';
import { useMemo, useState } from 'react';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import { sample_user } from '@/utility/sample_data/sample_user';
import { Card } from '@/components/UI/Card/Card';
import clsx from 'clsx';
import { Business } from '@/types/Business';

interface TeamsProps {
  selected?: Business,
  setSelected: React.Dispatch<React.SetStateAction<Business | undefined>>,
}

export const Teams: React.FC<TeamsProps> = ({selected, setSelected}) => {
  
  const teams = useMemo(() => sample_businesses.filter(b => b.id !== sample_user.own_business_id), []);

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
          <p>{t.elevated ? 'Admin' : 'Member'}</p>
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