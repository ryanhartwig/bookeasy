'use client';

import { Card } from '@/components/UI/Card/Card';
import { Business } from '@/types/Business';
import { useMemo, useState } from 'react';
import { Teams } from './teams';
import styles from './teams.module.scss';

import clsx from 'clsx';
import { User } from '@/types/User';
import { sample_members, sample_user } from '@/utility/sample_data/sample_user';
import { Client } from '@/types/Client';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { Service } from '@/types/Service';
import { sample_services } from '@/utility/sample_data/sample_services';
import { Overview } from './overview';
import Image from 'next/image';
import { Members } from './members';


export default function Page() {

  const [selected, setSelected] = useState<Business>();

  const members = useMemo<User[]>(() => selected 
    ? [...sample_members, sample_user].filter(m => m.business_ids.find(([id]) => id.includes(selected.id))) 
    : []
  , [selected]);
  const clients = useMemo<Client[]>(() => selected 
    ? sample_clients.filter(c => c.business_id === selected.id) 
    : []
  , [selected]);
  const services = useMemo<Service[]>(() => selected
    ? sample_services.filter(s => s.business_id === selected.id)
    : []
  , [selected]);
  
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
                <Overview selected={selected} members={members} clients={clients} services={services} />
              </Card>
              <Card className={clsx(styles.card, styles.members_overview)}>
                <Members members={members} selected={selected} />
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