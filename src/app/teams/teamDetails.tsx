import { BookingSitePrefs } from '@/components/business_settings/BookingSitePrefs';
import { ClientList } from '@/components/business_settings/ClientList';
import { Prefs } from '@/components/business_settings/Prefs';
import { Services } from '@/components/business_settings/Services';
import { Staff } from '@/components/business_settings/Staff';
import { Card } from '@/components/UI/Card/Card';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import { Business, NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { BusinessUser } from '@/types/User';
import { GET_BUSINESS_CLIENTS, GET_BUSINESS_SERVICES, GET_BUSINESS_USERS } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { Members } from './members';
import { Overview } from './overview';
import styles from './teams.module.scss';

interface TeamDetailsProps {
  business: NewBusiness,
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({business}) => {
  const [tab, setTab] = useState<number>(0);

  const [users, setUsers] = useState<BusinessUser[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  
  const { data: businessUsersData } = useQuery(GET_BUSINESS_USERS, { variables: { businessId: business.id }});
  useEffect(() => businessUsersData && 
    setUsers([...businessUsersData.getBusiness.users].sort((a, b) => a.user.name < b.user.name ? -1 : 1))
  , [businessUsersData]);

  const { data: businessServicesData } = useQuery(GET_BUSINESS_SERVICES, { variables: { businessId: business.id }});
  useEffect(() => businessServicesData && setServices(businessServicesData.getBusinessServices), [businessServicesData]);

  const { data: businessClientsData } = useQuery(GET_BUSINESS_CLIENTS, { variables: { businessId: business.id }});
  useEffect(() => businessClientsData && setClients(businessClientsData.getBusinessClients), [businessClientsData]);

  const tabs = useMemo(() => {
    return [
    <Prefs key='prefs' business={business} />, 
    <Services key='services' services={services} businessId={business.id} />,
    <ClientList key='clients' clients={clients} business={business} />,
    <BookingSitePrefs key='bookingsite' business={business} isTeams />,
    <Staff key='staff' business={business} clients={clients} members={users} services={services} />,
  ]}, [business, clients, services, users]);

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
          <Tabs tabs={['Preferences', 'Services', 'Client List', 'Booking Site', 'Staff']} tab={tab} setTab={setTab} />
          <div className={styles.settings_wrapper}>
            {tabs[tab]}
          </div>
        </Card>
      </div>
    </div>
  )
}