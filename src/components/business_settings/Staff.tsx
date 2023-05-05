import { Client } from "@/types/Client";
import { Service } from "@/types/Service";
import { BusinessUser, User } from "@/types/User";

import styles from './tabs.module.scss';
import { useMemo, useState } from "react";
import { Avatar } from "../UI/Avatar/Avatar";
import { Modal } from "../UI/Modal/Modal";

import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { Availability } from "./Availability";
import { NewBusiness } from "@/types/Business";

interface StaffProps {
  members: BusinessUser[],
  services: Service[],
  business: NewBusiness,
}

export const Staff: React.FC<StaffProps> = ({members, services, business}) => {

  const [selected, setSelected] = useState<User>();

  const staff = useMemo(() => 
    members.map(m => (
      <div className={styles.client} key={m.user.id}>
        <div>
          <Avatar src={m.user.avatar} size={28} />
        </div>
        <div>
          <p>{m.user.name}</p>
          <p>{services.filter(s => s.assigned_users.some(user => user.id === m.user.id)).length}</p>
          <p>{new Date(m.date_added)
            .toLocaleDateString()}</p>
          <p className={styles.details} onClick={() => setSelected(m.user)}>Details</p>
        </div>
      </div> 
      )
    )
  , [members, services]);

  return (
    <div className={styles.ClientList}>
      <div className={styles.header}>
        {['Name', 'Clients', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
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
            {selected && <Availability availabilitySlices={[]} key="availability" businessId={business.id} userId={selected?.id} />}
          </div>
        }
      </Modal>
    </div>
  )
}