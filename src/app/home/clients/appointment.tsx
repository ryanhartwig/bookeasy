import styles from './appointment.module.scss';

import { AppointmentData } from "@/types/Appointment"
import { useEffect, useMemo, useState } from 'react';
import { getDateTimeStringFull } from '@/utility/functions/conversions/getDateTimeString';
import { gql, useQuery } from '@apollo/client';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { BsTrash3 } from 'react-icons/bs';
interface AppointmentCardProps {
  app: AppointmentData,
  setSelectedAppointment?: React.Dispatch<React.SetStateAction<AppointmentData | undefined>>,
  showProvider?: boolean,
  allowCancellation?: boolean,
}

const query = gql`
  query($businessId: ID!) {
    getBusiness(business_id: $businessId) {
      min_cancel_notice
    }
  }
`;

export const AppointmentCard: React.FC<AppointmentCardProps> = ({app, setSelectedAppointment, showProvider = false, allowCancellation}) => {

  const date = useMemo<string>(() => getDateTimeStringFull(app.start_date), [app.start_date]);

  const [minCancelNotice, setMinCancelNotice] = useState<string>('');
  const { data: businessData } = useQuery(query, { variables: { businessId: app.business.id }, skip: !allowCancellation});
  useEffect(() => businessData && setMinCancelNotice(businessData.getBusiness.min_cancel_notice), [businessData]);
  const canCancel = useMemo(() => {
    if (!minCancelNotice) return false;

    const minTime = new Date(app.start_date);
    minTime.setTime(minTime.getTime() - Number(minCancelNotice));

    return Date.now() < minTime.getTime();
  }, [app.start_date, minCancelNotice]);

  return (
    <div className={styles.app} style={{borderLeftColor: app.service.color}}>
      <p className={styles.paid} style={{color: !app.is_paid ? '' : 'rgb(39, 131, 174)'}} >{app.is_paid ? '✓ Paid' : 'Unpaid'}</p>
      
      <div>
        <p>{app.service.name} - ${app.service_cost.toFixed(2)}</p>
        {showProvider && <p className={styles.provider}>{app.business.name}</p>}
        <p className={styles.duration}>{app.service_duration} min</p>
      </div>

      <div>
        <div className={styles.info}>
          <p className={styles.date}>{date}</p>

        </div>
        {setSelectedAppointment && <p className={styles.edit} onClick={() => setSelectedAppointment(app)}>Edit</p>}
        {allowCancellation && <TextButton icon={<BsTrash3 fontSize={11} />} disabled={!canCancel} altColor className={styles.cancel}>Cancel</TextButton>}
      </div>

    </div>
  )
}