import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { AppointmentInput } from '@/types/Appointment';
import { NewBusiness } from '@/types/Business';
import { getDateTimeString, getDateTimeStringFull } from '@/utility/functions/conversions/getDateTimeString';
import { useMemo } from 'react';
import uuid from 'react-uuid';
import { SelectedState } from '../page';
import styles from './forms.module.scss';

interface ConfirmProps {
  selected: SelectedState,
  business: NewBusiness,
}

export const Confirm: React.FC<ConfirmProps> = ({selected, business}) => {

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

  const [date, time] = getDateTimeStringFull(selected.startDate!);
  
  return (
    <div className={styles.confirm}>
      <div className={styles.header}>
        <hr />
        <p>Confirm Appointment Details</p>
        <hr />
      </div>
      <p className={styles.date}>{date} {time}</p>
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
        <TextButton>Confirm Booking</TextButton>
      </div>
    </div>
  )
}