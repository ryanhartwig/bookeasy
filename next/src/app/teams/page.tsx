'use client';

import { Card } from '@/components/UI/Card/Card';
import { Business } from '@/types/Business';
import { useState } from 'react';
import { Teams } from './teams';
import styles from './teams.module.scss';

export default function Page() {
  
  const [selected, setSelected] = useState<Business>();
  
  return (
    <div className={styles.Teams}>
      <div className={styles.teams_section}>
        <p>My teams</p>
        <Teams selected={selected} setSelected={setSelected} />
      </div>

      <div className={styles.team_overview}>
        {selected ? (
        <>
          <div className={styles.left}>
            <Card className={styles.card}>
              
            </Card>
            <Card className={styles.card} />
          </div>
          <div className={styles.right}>
            <Card className={styles.card} />
          </div>
        </> 
        ) : <p className={styles.select}>Select a team to see details</p>}
      </div>
      
    </div>
  )
}