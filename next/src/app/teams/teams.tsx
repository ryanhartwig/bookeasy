'use client';

import Image from 'next/image';
import styles from './teams.module.scss';

import addTeam from '../../../public/assets/team_add.svg'

export const Teams = () => {


  return (
    <div className={styles.user_teams}>
      {/* Teams user belongs to */}


      {/* Create team */}
      <div className={styles.create_team}>
        <p>Create Team</p>
        <Image src={addTeam} alt='Add team icon' className={styles.create_team_icon} />
      </div>
    </div>
  )
}