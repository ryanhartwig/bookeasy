'use client';

import { Tabs } from "@/components/UI/Tabs/Tabs";
import { useState } from "react";
import styles from './business.module.scss';
import { Availability } from "../../components/business_settings/Availability";
import { BookingSitePrefs } from "@/components/business_settings/BookingSitePrefs";
import { ClientList } from "@/components/business_settings/ClientList";
import { Prefs } from "@/components/business_settings/Prefs";
import { Services } from "@/components/business_settings/Services";
import { NewBusiness } from "@/types/Business";
import { Client } from "@/types/Client";
import { User } from "@/types/User";
import { Service } from "@/types/Service";
import { AvailabilitySlice } from "@/types/BaseAvailability";

interface SettingsProps {
  business: NewBusiness,
  clients: Client[],
  user: User,
  services: Service[],
  availability: AvailabilitySlice[],
}

export const Settings: React.FC<SettingsProps> = ({business, clients, user, services, availability}) => {

  const [tab, setTab] = useState<number>(0);
  const tabs = ['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability'];
  const tabComponents = [
    <Prefs key={Prefs.name} userId={user.id} business={business} />, 
    <ClientList clients={clients} key={ClientList.name} business={business} />, 
    <BookingSitePrefs key={BookingSitePrefs.name} business={business} userId={user.id} />, 
    <Services businessId={business.id} key={Services.name} services={services} />, 
    <Availability key={Availability.name} userId={user.id} businessId={business.id} availabilitySlices={availability} />,
  ];

  return (
    <>
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />
      <div className={styles.settings_wrapper}>
        <div className={styles.component_wrapper}>
        {tabComponents.map((component, i) => 
          <>
            {i === tab && component}
          </>
        )}
        </div>
      </div>
    </>
  )
}