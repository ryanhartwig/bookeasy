'use client';

import { Tabs } from "@/components/UI/Tabs/Tabs";
import { sample_base_availability } from "@/utility/sample_data/sample_base_availability";
import { sample_businesses } from "@/utility/sample_data/sample_businesses";
import { sample_clients } from "@/utility/sample_data/sample_clients";
import { sample_services } from "@/utility/sample_data/sample_services";
import { sample_user } from "@/utility/sample_data/sample_user";
import { useState } from "react";
import styles from './business.module.scss';
import { Availability } from "../../components/business_settings/Availability";
import { BookingSitePrefs } from "@/components/business_settings/BookingSitePrefs";
import { ClientList } from "@/components/business_settings/ClientList";
import { Prefs } from "@/components/business_settings/Prefs";
import { Services } from "@/components/business_settings/Services";

export const Settings: React.FC = () => {

  const [tab, setTab] = useState<number>(0);
  const tabs = ['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability'];
  const tabComponents = [
    <Prefs key={Prefs.name} business={sample_businesses.find(b => b.id === sample_user.own_business_id)!} />, 
    <ClientList clients={sample_clients.filter(c => c.business_id === sample_user.own_business_id)} key={ClientList.name} />, 
    <BookingSitePrefs key={BookingSitePrefs.name} business={sample_businesses.find(b => b.id === sample_user.own_business_id)!} />, 
    <Services key={Services.name} services={sample_services.filter(s => s.business_id === sample_user.own_business_id)} />, 
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