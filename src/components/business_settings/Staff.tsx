import { Service } from "@/types/Service";
import { Staff } from "@/types/User";

import styles from './tabs.module.scss';
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../UI/Avatar/Avatar";
import { Modal } from "../UI/Modal/Modal";

import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { Availability } from "./Availability";
import { NewBusiness } from "@/types/Business";
import { useQuery } from "@apollo/client";
import { AvailabilitySlice } from "@/types/BaseAvailability";
import { GET_STAFF_AVAILABILITY } from "@/utility/queries/availabilityQueries";

interface StaffProps {
  staffMembers: Staff[],
  services: Service[],
  business: NewBusiness,
}

export const StaffList: React.FC<StaffProps> = ({staffMembers, services, business}) => {

  const [selected, setSelected] = useState<Staff>();
  const [slices, setSlices] = useState<AvailabilitySlice[]>([]);

  const { data: availabilityData, loading } = useQuery(GET_STAFF_AVAILABILITY, { variables: { staffId: selected?.id }, skip: !selected});
  useEffect(() => {
    if (!availabilityData || loading) return;
    setSlices(availabilityData.getStaffAvailability);
  }, [availabilityData, loading]); 


  const staffList = useMemo(() => 
    staffMembers.map(staff => (
      <div className={styles.client} key={staff.id}>
        <div>
          <Avatar src={staff.avatar} size={28} />
        </div>
        <div>
          <p>{staff.name}</p>
          <p>{services.filter(s => s.assigned_staff.some(s => s.id === staff.id)).length}</p>
          <p>{new Date(staff.date_added)
            .toLocaleDateString()}</p>
          <p className={styles.details} onClick={() => {setSelected(staff)}}>Availability</p>
        </div>
      </div> 
      )
    )
  , [staffMembers, services]);

  return (
    <div className={styles.StaffList}>
      <div className={styles.header}>
        {['Name', 'Clients', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
      </div>
      {staffList}
      <Modal 
        open={!!selected} 
        escapeCloses 
        onClose={() => setSelected(undefined)} 
        className={styles.modal} 
      >
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
                    {selected.contact_phone ?? 'None'}
                  </li>
                  <li>
                    <HiOutlineMail />
                    {selected.contact_email}
                  </li>
                </ul>
              </div>
            </div>
            {selected && <Availability availabilitySlices={slices} key="availability" businessId={business.id} userId={selected.id} staffId={selected.id} />}
          </div>
        }
      </Modal>
    </div>
  )
}