'use client';

import { Tabs } from "@/components/UI/Tabs/Tabs";
import { useState } from "react";

export const Settings: React.FC = () => {

  const [tab, setTab] = useState<number>(0);
  
  return (
    <>
      <Tabs tab={tab} setTab={setTab} tabs={['Preferences', 'Client List', 'Booking Site', 'Services', 'Availability']} />
    </>
  )
}