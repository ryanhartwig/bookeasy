import { Client } from "@/types/Client";
import { Service } from "@/types/Service";
import { User } from "@/types/User";

import styles from './tabs.module.scss';
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../UI/Avatar/Avatar";
import { UserMeta } from "@/utility/functions/fetch/business/getBusinessUserMeta";
import { Modal } from "../UI/Modal/Modal";

import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { Tabs } from "../UI/Tabs/Tabs";
import { Services } from "./Services";
import { ClientList } from "./ClientList";
import { Availability } from "./Availability";
import { AvailabilitySlice, BaseAvailability } from "@/types/BaseAvailability";
import { getUserAvailability } from "@/utility/functions/fetch/getUserAvailability";
import { Business } from "@/types/Business";


interface StaffProps {
  members: User[],
  services: Service[],
  clients: Client[],
  meta: UserMeta[],
  business: Business,
}

export const Staff: React.FC<StaffProps> = ({members, services, clients, meta, business}) => {

  const [selected, setSelected] = useState<User>();
  const [tab, setTab] = useState<number>(0);
  const [availabilityMap, setAvailabilityMap] = useState<Map<string, AvailabilitySlice[]>>(new Map());

  useEffect(() => {
    if (!selected) setTab(0);
  }, [selected]);

  useEffect(() => {
    if (!selected) return;
    if (availabilityMap.has(selected.id)) return;

    ;(async () => {
      const result = await getUserAvailability(selected.id);
      setAvailabilityMap(p => {
        const map = new Map(p);

        const slices: AvailabilitySlice[] = [];
        
        const resultSlices = result.data.find(base => base.businessId === business.id)?.slices;
        if (resultSlices) slices.push(...resultSlices);
        
        map.set(selected.id, slices);
        return map;
      })
    })()
  }, [availabilityMap, business.id, selected]);

  const staff = useMemo(() => 
    members.map(m => (
      <div className={styles.client} key={m.id}>
        <div>
          <Avatar src={m.avatar} size={28} />
        </div>
        <div>
          <p>{m.name}</p>
          <p>{services.filter(s => s.userIds.includes(m.id)).length}</p>
          <p>{clients.filter(c => c.assignedUserIds.includes(m.id)).length}</p>
          <p>{new Date(meta.find(meta => meta.userId === m.id)!.dateAdded)
            .toLocaleDateString()}</p>
          <p className={styles.details} onClick={() => setSelected(m)}>Details</p>
        </div>
      </div> 
      )
    )
  , [clients, members, meta, services]);

  const tabs = useMemo(() => [
    <Services 
      services={services.filter(s => s.userIds.includes(selected?.id ?? ""))} 
      key='services'
    />,
    <ClientList clients={clients.filter(c => c.assignedUserIds.includes(selected?.id ?? ""))} key="clients" />,
    <Availability availabilitySlices={availabilityMap.get(selected?.id || "") || []} key="availability" />,
  ], [availabilityMap, clients, selected?.id, services]);

  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Services', 'Clients', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
      </div>
      {staff}
      <Modal open={!!selected} escapeCloses onClose={() => setSelected(undefined)} className={styles.modal} >
        <Modal.Header>Staff Details</Modal.Header>
        {selected &&
          <div className={styles.staff_content}>
            <div className={styles.staff_details}>
              <Avatar src={selected.avatar} size={86} />
              <div>
                <p>{selected.name}</p>
                <ul>
                  <li>
                    <HiOutlinePhone />
                    {selected.phone ?? 'None'}
                  </li>
                  <li>
                    <HiOutlineMail />
                    {selected.email}
                  </li>
                </ul>
              </div>
            </div>
            <Tabs style={{flexGrow: 0, flexShrink: 0}} tab={tab} setTab={setTab} tabs={['Services', 'Clients', 'Availability']} />
            {tabs[tab]}
          </div>
        }
      </Modal>
    </div>
  )
}