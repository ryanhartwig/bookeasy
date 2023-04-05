'use client';

import { Tabs } from "@/components/UI/Tabs/Tabs";
import { sample_base_availability } from "@/utility/sample_data/sample_base_availability";
import { useState } from "react";
import styles from './business.module.scss';
import { Availability } from "../../components/business_settings/Availability";
import { BookingSitePrefs } from "@/components/business_settings/BookingSitePrefs";
import { ClientList } from "@/components/business_settings/ClientList";
import { Prefs } from "@/components/business_settings/Prefs";
import { Services } from "@/components/business_settings/Services";
import { Business } from "@/types/Business";
import { Client } from "@/types/Client";
import { User } from "@/types/User";
import { Service } from "@/types/Service";
import { BaseAvailability } from "@/types/BaseAvailability";

interface SettingsProps {
  businesses: Business[],
  clients: Client[],
  user: User,
  services: Service[],
  // availability: BaseAvailability,
}

export const Settings: React.FC<SettingsProps> = ({businesses, clients, user, services}) => {

  const [tab, setTab] = useState<number>(0);
  const tabs = ['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability'];
  const tabComponents = [
    <Prefs key={Prefs.name} business={businesses.find(b => b.id === user.ownBusinessId)!} />, 
    <ClientList clients={clients.filter(c => c.businessId === user.ownBusinessId)} key={ClientList.name} />, 
    <BookingSitePrefs key={BookingSitePrefs.name} business={businesses.find(b => b.id === user.ownBusinessId)!} />, 
    <Services key={Services.name} services={services.filter(s => s.businessId === user.ownBusinessId)} />, 
    <Availability key={Availability.name} availabilitySlices={sample_base_availability.slices} />,
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