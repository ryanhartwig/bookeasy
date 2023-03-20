'use client';

import { Card } from '@/components/UI/Card/Card';
import { Business } from '@/types/Business';
import { useState } from 'react';
import { Teams } from './teams';
import styles from './teams.module.scss';
import Image from 'next/image';

import teamDefault from '../../../public/assets/team_default.png';
import clsx from 'clsx';


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
            <Card className={clsx(styles.card, styles.overview)}>
              <Image src={teamDefault} width={139} alt='Add team icon' />
              <h2>{selected.name}</h2>
              <hr />
              <div>
                <div>
                  <p>n</p>
                  <p>member(s)</p>
                </div>
                <div>
                  <p>n</p>
                  <p>client(s)</p>
                </div>
                <div>
                  <p>n</p>
                  <p>service(s)</p>
                </div>
              </div>
            </Card>
            <Card className={styles.card}>

            </Card>
          </div>
          <div className={styles.right}>
            <Card className={styles.card}>
              
            </Card>
          </div>
        </> 
        ) : <p className={styles.select}>Select a team to see details</p>}
      </div>
      
    </div>
  )
}