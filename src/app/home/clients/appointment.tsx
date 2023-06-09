import styles from './appointment.module.scss';

import { AppointmentData } from "@/types/Appointment"
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getDateTimeStringFull } from '@/utility/functions/conversions/getDateTimeString';
import { gql, useMutation, useQuery } from '@apollo/client';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { BsTrash3 } from 'react-icons/bs';
import { DELETE_APPOINTMENT, GET_REGISTERED_CLIENT_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { Modal } from '@/components/UI/Modal/Modal';
import { CiWarning } from 'react-icons/ci';
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
  const [minCancelNotice, setMinCancelNotice] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const date = useMemo<string>(() => getDateTimeStringFull(app.start_date), [app.start_date]);

  const { data: businessData } = useQuery(query, { variables: { businessId: app.business.id }, skip: !allowCancellation});
  const [deleteAppointment, { loading: deletingAppointment }] = useMutation(DELETE_APPOINTMENT, {
    refetchQueries: [GET_REGISTERED_CLIENT_APPOINTMENTS]
  });

  useEffect(() => businessData && setMinCancelNotice(businessData.getBusiness.min_cancel_notice), [businessData]);

  const canCancel = useMemo(() => {
    if (!minCancelNotice) return false;

    const minTime = new Date(app.start_date);
    minTime.setTime(minTime.getTime() - Number(minCancelNotice));

    return Date.now() < minTime.getTime();
  }, [app.start_date, minCancelNotice]);
  
  const onCancel = useCallback(() => {
    ;(async () => {
      await deleteAppointment({variables: { appointmentId: app.id }});
      // Todo: send notification to user through email & notification table
    })();
  }, [app.id, deleteAppointment]);

  return (
    <div className={styles.app} style={{borderLeftColor: app.service.color}}>
      <p className={styles.paid} style={{color: !app.is_paid ? '' : 'rgb(39, 131, 174)'}} >{app.is_paid ? '✓ Paid' : 'Unpaid'}</p>
      
      <div>
        <p>{app.service.name} - ${app.service_cost.toFixed(2)}</p>
        {showProvider && <p className={styles.provider}>{app.business.name}</p>}
        <p className={styles.duration}>{app.service_duration} min</p>
      </div>

      <div className={styles.infoWrapper}>
        <div className={styles.info}>
          <p className={styles.date}>{date}</p>

        </div>
        {setSelectedAppointment && <TextButton className={styles.edit} onClick={() => setSelectedAppointment(app)}>Edit</TextButton>}
        {allowCancellation && <TextButton icon={<BsTrash3 fontSize={11} />} 
          disabled={!canCancel || deletingAppointment} 
          altColor 
          className={styles.cancel}
          onClick={() => canCancel && setConfirmDelete(true)}
        >Cancel</TextButton>}
      </div>
      <Modal open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        actionButtonDisabled={deletingAppointment}
        actionButtonText={'Confirm'}
        actionCloses
        onAction={() => onCancel()}
        noOffset
      >
        <Modal.Header>Confirm Cancellation</Modal.Header>
        <div className={styles.confirm}>
          <CiWarning className={styles.warning} />
          <p>This will cancel your appointment with</p>
          <p>{app.staff.name}</p>
          <p>on</p>
          <p>{date}</p>
        </div>
      </Modal>
    </div>
  )
}