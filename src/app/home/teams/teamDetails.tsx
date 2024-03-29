import { ClientList } from '@/components/business_settings/ClientList';
import { Prefs } from '@/components/business_settings/Prefs';
import { Services } from '@/components/business_settings/Services';
import { StaffList } from '@/components/business_settings/Staff';
import { Card } from '@/components/UI/Card/Card';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import { NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { Staff } from '@/types/User';
import { GET_BUSINESS_CLIENTS, GET_BUSINESS_SERVICES, GET_BUSINESS_STAFF } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';
import { Members } from './members';
import { Overview } from './overview';
import styles from './teams.module.scss';

interface TeamDetailsProps {
  business: NewBusiness,
  userId: string,
  setSelectedBusiness: React.Dispatch<React.SetStateAction<NewBusiness | undefined>>,
}

export const TeamDetails: React.FC<TeamDetailsProps> = ({business, userId, setSelectedBusiness}) => {
  const [tab, setTab] = useState<number>(0);

  const [staff, setStaff] = useState<Staff[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const elevated = useMemo(() => staff.find(s => s.registered_user_id === userId)?.elevated || false, [userId, staff]);
  const tabNames = useMemo(() => {
    const tabs = ['Staff', 'Client List', 'Services'];
    if (elevated) tabs.push('Admin');
    return tabs;
  }, [elevated]);
  
  const { data: businessUsersData } = useQuery(GET_BUSINESS_STAFF, { variables: { businessId: business.id }});
  
  useEffect(() => businessUsersData && 
    setStaff([...businessUsersData.getBusiness.staff].sort((a, b) => a.name < b.name ? -1 : 1))
  , [businessUsersData]);

  const { data: businessServicesData } = useQuery(GET_BUSINESS_SERVICES, { variables: { businessId: business.id }});
  useEffect(() => businessServicesData && setServices(businessServicesData.getBusinessServices), [businessServicesData]);

  const { data: businessClientsData } = useQuery(GET_BUSINESS_CLIENTS, { variables: { businessId: business.id }});
  useEffect(() => businessClientsData && setClients(businessClientsData.getBusinessClients), [businessClientsData]);

  const tabs = useMemo(() => {
    const tabs = [
      <StaffList setSelectedBusiness={setSelectedBusiness} key='staff' business={business} staffMembers={staff} services={services} userId={userId} elevated={elevated} />,
      <ClientList key='clients' clients={clients} business={business} />,
      <Services key='services' userId={userId} services={services} businessId={business.id} />,
    ];
    if (elevated) tabs.push(<Prefs key='prefs' business={business} isTeams elevated={staff.find(s => s.registered_user_id === userId)?.elevated || false} />);
    return tabs;
  }, [setSelectedBusiness, business, staff, services, userId, elevated, clients]);

  return (
    <div className={styles.team_overview}>
      <div className={styles.left}>
        <Card className={clsx(styles.card, styles.overview)}>
          <Overview selected={business} members={staff} clients={clients} services={services} />
        </Card>
        <Card className={clsx(styles.card, styles.members_overview)}>
          <Members staff={staff} />
        </Card>
      </div>
      <div className={styles.right}>
        <Card className={styles.card}>
          <Tabs tabs={tabNames} tab={tab} setTab={setTab} />
          <div className={styles.settings_wrapper}>
            {tabs[tab]}
          </div>
        </Card>
      </div>
    </div>
  )
}