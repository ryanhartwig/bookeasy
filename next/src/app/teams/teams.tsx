'use client';

import Image from 'next/image';
import styles from './teams.module.scss';

import addTeam from '../../../public/assets/team_add.svg'
import { useMemo, useState } from 'react';
import { sample_businesses } from '@/utility/sample_data/sample_businesses';
import { sample_user } from '@/utility/sample_data/sample_user';
import { Card } from '@/components/UI/Card/Card';
import clsx from 'clsx';



export const Teams = () => {
  
  const teams = useMemo(() => sample_businesses.filter(b => b.id !== sample_user.own_business_id), []);
  const [selected, setSelected] = useState<string>('');

  return (
    <div className={styles.user_teams}>
      {/* Teams user belongs to */}
      {teams.map(t => (
        <Card key={t.id} 
          className={clsx(styles.team, {[styles.selected]: selected === t.id})}
          onClick={() => setSelected(t.id)}
        >

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