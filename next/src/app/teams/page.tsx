'use client';

import { Card } from '@/components/UI/Card/Card';
import { useState } from 'react';
import { Teams } from './teams';
import styles from './teams.module.scss';

export default function Page() {
  
  const [selected, setSelected] = useState<string>('');
  
  return (
    <div className={styles.Teams}>
      <div className={styles.teams_section}>
        <p>My teams</p>
        <Teams selected={selected} setSelected={setSelected} />
      </div>

      <div className={styles.team_overview}>
        <div className={styles.left}>
          <Card className={styles.card} />
          <Card className={styles.card} />
        </div>
        <div className={styles.right}>
          <Card className={styles.card} />
        </div>
      </div>
      
    </div>
  )
}