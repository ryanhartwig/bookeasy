import { BookingSitePrefs } from '@/components/business_settings/BookingSitePrefs';
import { ClientList } from '@/components/business_settings/ClientList';
import { Services } from '@/components/business_settings/Services';
import { Staff } from '@/components/business_settings/Staff';
import { Card } from '@/components/UI/Card/Card';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import { Business } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { BusinessUser } from '@/types/User';
import clsx from 'clsx';
import React, { useMemo, useState } from 'react';
import { Members } from './members';
import { Overview } from './overview';
import styles from './teams.module.scss';

interface TeamDetailsProps {
  business: Business,
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({business}) => {
  const [tab, setTab] = useState<number>(0);

  const [users, setUsers] = useState<BusinessUser[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const tabs = useMemo(() => {
    return [
    // <Services key='services' services={services} />,
    // <ClientList key='clients' clients={clients} />,
    // <BookingSitePrefs key='bookingsite' business={business} />,
    // <Staff key='staff' business={business} clients={clients} members={users} services={services} meta={meta} />,
  ]}, []);

  return (
    <div className={styles.team_overview}>
      <div className={styles.left}>
        <Card className={clsx(styles.card, styles.overview)}>
          <Overview selected={business} members={users} clients={clients} services={services} />
        </Card>
        <Card className={clsx(styles.card, styles.members_overview)}>
          <Members members={users} />
        </Card>
      </div>
      <div className={styles.right}>
        <Card className={styles.card}>
          <Tabs tabs={['Services', 'Client List', 'Booking Site', 'Staff']} tab={tab} setTab={setTab} />
          <div className={styles.settings_wrapper}>
            {tabs[tab]}
          </div>
        </Card>
      </div>
    </div>
  )
}