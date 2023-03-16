'use client';

import { Tabs } from "@/components/UI/Tabs/Tabs";
import { sample_businesses } from "@/utility/sample_data/sample_businesses";
import { sample_business_prefs } from "@/utility/sample_data/sample_business_prefs";
import { sample_clients } from "@/utility/sample_data/sample_clients";
import { sample_user } from "@/utility/sample_data/sample_user";
import { useState } from "react";
import styles from './business.module.scss';
import { Availability } from "./tabs/Availability";
import { BookingSitePrefs } from "./tabs/BookingSitePrefs";
import { ClientList } from "./tabs/ClientList";
import { Prefs } from "./tabs/Prefs";
import { Services } from "./tabs/Services";

export const Settings: React.FC = () => {

  const [tab, setTab] = useState<number>(0);
  const tabs = ['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability'];
  const tabComponents = [
    <Prefs key={Prefs.name} business={sample_businesses.find(b => b.id === sample_user.own_business_id)!} />, 
    <ClientList clients={sample_clients.filter(c => c.business_id === sample_user.own_business_id)} key={ClientList.name} />, 
    <BookingSitePrefs key={BookingSitePrefs.name} business_prefs={sample_business_prefs.find(pref => pref.business_id === sample_user.own_business_id)!} />, 
    <Services key={Services.name} />, 
    <Availability key={Availability.name} />
  ];
  
  return (
    <>
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />
      <div className={styles.settings_wrapper}>
        {tabComponents.map((component, i) => 
          i === tab 
            ? <div 
                key={i} 
                className={styles.component_wrapper}
              >
                {component}
              </div> 
            : <div key={i}></div>
        )}
      </div>
    </>
  )
}