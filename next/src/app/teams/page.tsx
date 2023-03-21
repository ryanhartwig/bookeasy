'use client';

import { Card } from '@/components/UI/Card/Card';
import { Business } from '@/types/Business';
import { SetStateAction, useMemo, useState } from 'react';
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
import { Members } from './members';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import { Services } from '@/components/business_settings/Services';
import { ClientList } from '@/components/business_settings/ClientList';
import { BookingSitePrefs } from '@/components/business_settings/BookingSitePrefs';
import { sample_business_prefs } from '@/utility/sample_data/sample_business_prefs';



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

  const [tab, setTab] = useState<number>(0);

  const tabs = useMemo(() => {
    if (!selected) return []; 
    return [
    <Services key='services' services={services} />,
    <ClientList key='clients' clients={clients} />,
    <BookingSitePrefs key='bookingsite' business_prefs={sample_business_prefs.find(pref => pref.business_id === selected!.id)!} />,
  ]}, [clients, selected, services]);
  
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
                <Tabs tabs={['Services', 'Client List', 'Booking Site', 'Staff']} tab={tab} setTab={setTab} />
                <div className={styles.settings_wrapper}>
                  {tabs.map((component, i) => (
                    <>
                      {i === tab && component}
                    </>
                  ))}
                </div>
              </Card>
            </div>
          </> 
        ) : <p className={styles.select}>Select a team to see details</p>}
      </div>
      
    </div>
  )
}