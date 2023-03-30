'use client';

import { Card } from '@/components/UI/Card/Card';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import { Appointment } from '@/types/Appointment';
import { Client } from '@/types/Client';
import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import clsx from 'clsx';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { AppointmentCard } from './appointment';
import styles from './clients.module.scss';

interface DetailsProps {
  selected: Client,
}

export const Details: React.FC<DetailsProps> = ({selected}) => {

  const previous = useMemo<Appointment[]>(() => {
    return sample_appointments.filter(app => 
      app.clientId === selected.id && app.startDate < Date.now()
    );
  }, [selected.id]);

  const booked = useMemo<Appointment[]>(() => {
    return sample_appointments.filter(app => 
      app.clientId === selected.id && app.startDate >= Date.now()
    );
  }, [selected.id]);

  const unpaid = useMemo<string>(() => {
    console.log(previous.concat(booked));
    
    return previous.concat(booked)
      .filter(app => !app.isPaid)
      .map(app => app.serviceCost)
      .reduce((a, b) => a + b, 0)
      .toFixed(2)
  }, [booked, previous]);

  const [tab, setTab] = useState<number>(0);

  return (
    <div className={styles.details}>
      <div>
        {/* Client photo, name, contact info, notes */}
        <Card className={clsx(styles.card, styles.client_details)} style={{height: 444}}>
          {selected.avatar && 
            <Image src={selected.avatar} alt="Client avatar" style={{width: 115, height: 115}} />
          }
          <p className={styles.client_name}>{selected.name}</p>
          <hr />
          <div className={styles.client_contact}>
            <div>
              <p className={styles.label}>phone</p>
              <p>{selected.phone}</p>
            </div>
            <div>
              <p className={styles.label}>email</p>
              <p>{selected.email}</p>
            </div>
            <div>
              <p className={styles.label}>address</p>
              <p>{selected.address}</p>
            </div>
          </div>
          <p className={styles.label} style={{width: '95%', marginTop: 5}}>notes</p>
          <div className={styles.notes}>
            <p>{selected.notes}</p>
          </div>
          <p className={styles.edit}>Edit</p>
        </Card>

        {/* Client metrics (total appointments, calculated revenue, etc) */}
        <Card className={clsx(styles.card, styles.metrics)} style={{height: 272}}>
            <div className={styles.metric}>
              <p>{previous.length}</p>
              <p className={styles.label}>Past Appointments</p>
            </div>
            <hr />
            <div className={styles.metric}>
              <p>{booked.length}</p>
              <p className={styles.label}>Booked Appointments</p>
            </div>
            <hr />
            <div className={styles.metric}>
              <p>${previous.map(p => p.serviceCost).reduce((a, b) => a + b, 0).toFixed(2)}</p>
              <p className={styles.label}>Total Estimated Revenue</p>
            </div>
            <hr />
            <div className={styles.metric}>
              <p>${unpaid}</p>
              <p className={styles.label}>Unpaid</p>
            </div>  
        </Card>
      </div>
      <div>
        <Card className={clsx(styles.card, styles.apps)} style={{height: 736}}>
          <Tabs tabs={['Booked', 'Previous']} tab={tab} setTab={setTab} />
          <div className={styles.results}>
            {tab === 0
              ? booked.map((app) => <AppointmentCard key={app.id} app={app} />)
              : previous.map((app) => <AppointmentCard key={app.id} app={app} />)}
          </div>
        </Card>
      </div>
    </div>
  )
}