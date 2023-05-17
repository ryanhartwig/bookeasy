import { Service } from "@/types/Service";
import { Staff } from "@/types/User";

import styles from './tabs.module.scss';
import { useEffect, useMemo, useState } from "react";
import { Avatar } from "../UI/Avatar/Avatar";
import { Modal } from "../UI/Modal/Modal";

import { HiOutlineMail, HiOutlinePhone } from 'react-icons/hi';
import { VscUnverified, VscVerifiedFilled } from 'react-icons/vsc';
import { Availability } from "./Availability";
import { NewBusiness } from "@/types/Business";
import { useQuery } from "@apollo/client";
import { AvailabilitySlice } from "@/types/BaseAvailability";
import { GET_STAFF_AVAILABILITY } from "@/utility/queries/availabilityQueries";
import clsx from "clsx";
import { AiOutlinePlus } from "react-icons/ai";
import { StaffForm } from "./StaffForm";
import { TextButton } from "../UI/TextButton/TextButton";

interface StaffProps {
  staffMembers: Staff[],
  services: Service[],
  business: NewBusiness,
}

export const StaffList: React.FC<StaffProps> = ({staffMembers, services, business}) => {

  const [selected, setSelected] = useState<Staff>();
  const [slices, setSlices] = useState<AvailabilitySlice[]>([]);
  const [staffFormOpen, setStaffFormOpen] = useState<boolean>(false);
  const [initialStaff, setInitialStaff] = useState<Staff>();

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
          <TextButton style={{width: '100%'}} onClick={() => {setSelected(staff)}}>Details</TextButton>
        </div>
      </div> 
      )
    )
  , [staffMembers, services]);

  return (
    <div className={styles.StaffList}>
      <div className={styles.header}>
        {['Name', 'Services', 'Date Added', ''].map(t => <p key={t}>{t}</p>)}
      </div>
      {staffList}
      <div className={styles.addService} onClick={() => setStaffFormOpen(true)}>
        <AiOutlinePlus fontSize={18} />
      </div>
      {/* Staff Details Modal */}
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
                <div className={styles.staff_name}>
                  <p>{selected.name}</p>
                  <div className={clsx({[styles.registered]: selected.registered_user_id})}>
                    {selected.registered_user_id ? <VscVerifiedFilled fontSize={15} /> : <VscUnverified fontSize={15} />}
                    <p className={styles.tooltip}>{selected.registered_user_id ? 'Registered User' : 'Unregistered'}</p>
                  </div>
                </div>
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
              <div className={styles.edit_staff}>
                <p onClick={() => {
                  setInitialStaff(selected);
                }}>Edit</p>
              </div>
            </div>
            <div className={styles.bookable}>
              {selected && <Availability availabilitySlices={slices} key="availability" businessId={business.id} userId={selected.id} staffId={selected.id}  />}
            </div>
            {initialStaff && <StaffForm open={!!initialStaff} onClose={() => setInitialStaff(undefined)} businessId={business.id} initialStaff={initialStaff} setSelectedStaff={setSelected} />}
          </div>
        }
      </Modal>

      {/* Add / Edit Staff Form */}
      {staffFormOpen && <StaffForm open={staffFormOpen} onClose={() => setStaffFormOpen(false)} businessId={business.id} />}
    </div>
  )
}