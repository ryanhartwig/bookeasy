import { useUser } from '@/app/Providers';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { LoadingDots } from '@/components/UI/LoadingDots/LoadingDots';
import { Spinner } from '@/components/UI/Spinner/Spinner';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { AppointmentInput } from '@/types/Appointment';
import { NewBusiness } from '@/types/Business';
import { getDateTimeStringFull } from '@/utility/functions/conversions/getDateTimeString';
import { ADD_EDIT_APPOINTMENT, GET_STAFF_APPOINTMENTS_DATES, GET_USER_APPOINTMENTS_DATES } from '@/utility/queries/appointmentQueries';
import { GET_BOOKING_SITE_CLIENT_ID } from '@/utility/queries/clientQueries';
import { useMutation, useQuery } from '@apollo/client';
import { useCallback, useMemo, useState } from 'react';
import uuid from 'react-uuid';
import { Details, SelectedState } from '../page';
import styles from './forms.module.scss';

interface ConfirmProps {
  selected: SelectedState,
  business: NewBusiness,
  setSelected: React.Dispatch<React.SetStateAction<any>>,
  setSuccessModal: React.Dispatch<React.SetStateAction<Details | null>>,
}

export const Confirm: React.FC<ConfirmProps> = ({selected, setSelected, setSuccessModal, business}) => {
  const { id: registeredUserId } = useUser();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { data: clientData, loading: loadingClientData } = useQuery(GET_BOOKING_SITE_CLIENT_ID, { variables: { businessId: business.id, registeredUserId }});

  const dateString = getDateTimeStringFull(selected.startDate!);
  const endDate = useMemo(() => {
    const endDate = new Date(selected.startDate!);
    endDate.setTime(endDate.getTime() + (selected.service!.duration * 1000 * 60));
    return endDate;
  }, [selected.service, selected.startDate]);

  const appointment = useMemo<AppointmentInput>(() => ({
    business_id: business.id,
    client_id: 'c7',
    id: uuid(),
    staff_id: selected.staff!.id,
    service_id: selected.service!.id,
    service_cost: selected.service!.cost,
    service_duration: selected.service!.duration,
    is_video: selected.service!.is_video,
    is_paid: false,
    start_date: selected.startDate!.toISOString(),
    end_date: endDate.toISOString(),
  }), [business.id, endDate, selected.service, selected.staff, selected.startDate]);

  const [addAppointment] = useMutation(ADD_EDIT_APPOINTMENT, { variables: { appointment },
    refetchQueries: [GET_USER_APPOINTMENTS_DATES]
  });
  const onConfirmBooking = useCallback(() => {
    setLoading(true);
    ;(async () => {
      const { errors } = await addAppointment();
      if (errors) {
        setLoading(false);
        setError('Could not schedule appointment. Please try again or refresh the page.');
        return;
      }
      setSuccessModal({
        ...selected as Details
      });
      setSelected({
        service: null,
        staff: null,
        startDate: null,
      });
    })();
  }, [addAppointment, selected, setSelected, setSuccessModal]);
  
  return (
    <div className={styles.confirm}>
      <div className={styles.header}>
        <hr />
        <p>Confirm Appointment Details</p>
        <hr />
      </div>
      <p className={styles.date}>{dateString}</p>
      <div className={styles.overview}>
        <div className={styles.agent}>
          <p>Your agent</p>
          <Card className={styles.agentCard}>
            <Avatar src={selected.staff!.avatar} size={114} />
            <p className={styles.name}>{selected.staff!.name}</p>
            <p className={styles.credentials}>Credentials</p>
          </Card>
        </div>
        <div className={styles.service}>
          <p>Your Service</p>
          <Card className={styles.serviceCard} style={{borderColor: selected.service!.color}}>
            <div className={styles.serviceDetails}>
              <p>{selected.service!.name}</p>
              <p className={styles.serviceDuration}>{selected.service!.duration} min</p>
            </div>
            <div>
              <p className={styles.business}>{business.name}</p>
            </div>
            <p className={styles.cost}>${selected.service!.cost.toFixed(2)}</p>
          </Card>
        </div>
      </div>
      <div className={styles.confirmButton}>
        {!loadingClientData 
          ? <TextButton fontSize={14} onClick={onConfirmBooking}>Confirm Booking</TextButton>
          : <Spinner />
        }
      </div>
    </div>
  )
}