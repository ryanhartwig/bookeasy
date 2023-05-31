import { Availability } from '@/components/business_settings/Availability';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Modal } from '@/components/UI/Modal/Modal';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { Staff } from '@/types/User';
import { GET_STAFF_AVAILABILITY } from '@/utility/queries/availabilityQueries';
import { useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import { HiOutlineMail } from 'react-icons/hi';
import { HiOutlinePhone } from 'react-icons/hi2';
import styles from './forms.module.scss';
import staffStyles from '@/components/business_settings/tabs.module.scss';
import { Spinner } from '@/components/UI/Spinner/Spinner';

interface SelectAgentProps {
  staff: Staff[],
  businessId?: string,
}

export const SelectAgent: React.FC<SelectAgentProps> = ({staff, businessId}) => {
  const [detailsSelected, setDetailsSelected] = useState<Staff>();
  const [slices, setSlices] = useState<AvailabilitySlice[]>([]);
  
  const { data: availabilityData, loading } = useQuery(GET_STAFF_AVAILABILITY, { variables: { staffId: detailsSelected?.id }, skip: !detailsSelected});
  useEffect(() => {
    if (!availabilityData || loading) return;
    setSlices(availabilityData.getStaffAvailability);
  }, [availabilityData, loading]); 

  return (
    <div className={styles.selectAgent}>
      {staff.map(s => (
        <div key={s.id} className={styles.staffCard}>
          <Avatar size={100} src={s.avatar} />
          <h2>{s.name}</h2>
          <p className={styles.credentials}>Credentials</p>
          <p className={styles.bio}>This person is a person who offers a service for a company of whom you have decided to book an appointment with at this current point in time.</p>
          <TextButton onClick={() => setDetailsSelected(s)} >Details</TextButton>
        </div>
      ))}
      <Modal 
        open={!!detailsSelected} 
        onClose={() => setDetailsSelected(undefined)} 
        className={staffStyles.modal} 
        noOffset
      >
        <Modal.Header>Agent Details</Modal.Header>
        {detailsSelected &&
          <div className={staffStyles.staff_content}>
            <div className={staffStyles.staff_details}>
              <Avatar src={detailsSelected.avatar} size={86} />
              <div>
                <div className={staffStyles.staff_name}>
                  <p>{detailsSelected.name}</p>
                </div>
                <ul>
                  <li>
                    <HiOutlinePhone />
                    {detailsSelected.contact_phone ?? 'None'}
                  </li>
                  <li>
                    <HiOutlineMail />
                    {detailsSelected.contact_email ?? 'None'}
                  </li>
                </ul>
              </div>
            </div>
            <div className={staffStyles.bookable}>
              {loading 
                ? <Spinner style={{margin: 20}} />
                : detailsSelected && businessId && <Availability availabilitySlices={slices} key="availability" businessId={businessId} userId={detailsSelected.id} staffId={detailsSelected.id} readonly />
              }
            </div>
          </div>
        }
      </Modal>
    </div>
  )
}