'use client';

import { Tabs } from "@/components/UI/Tabs/Tabs";
import { useMemo, useState } from "react";
import styles from './business.module.scss';
import { Availability } from "./tabs/Availability";
import { BookingSitePrefs } from "./tabs/BookingSitePrefs";
import { ClientList } from "./tabs/ClientList";
import { Prefs } from "./tabs/Prefs";
import { Services } from "./tabs/Services";

export const Settings: React.FC = () => {

  const [tab, setTab] = useState<number>(0);
  const tabs = ['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability'];
  const tabComponents = [Prefs, ClientList, BookingSitePrefs, Services, Availability];
  
  return (
    <>
      <Tabs tab={tab} setTab={setTab} tabs={tabs} />
      <div className={styles.settings_wrapper}>
        {tabComponents.map((Comp, i) => 
          i === tab ? <Comp key={Comp.name}/> : <div key={i}></div>
        )}
      </div>
    </>
  )
}