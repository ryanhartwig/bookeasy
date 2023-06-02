import { AppointmentInput } from '@/types/Appointment';
import { useMemo } from 'react';
import uuid from 'react-uuid';
import { SelectedState } from '../page';
import styles from './forms.module.scss';

interface ConfirmProps {
  selected: SelectedState,
  businessId: string,
}

export const Confirm: React.FC<ConfirmProps> = ({selected, businessId}) => {

  const endDate = useMemo(() => {
    const endDate = new Date(selected.startDate!);
    endDate.setTime(endDate.getTime() + (selected.service!.duration * 1000 * 60));
    return endDate;
  }, [selected.service, selected.startDate]);

  const appointment = useMemo<AppointmentInput>(() => ({
    business_id: businessId,
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
  }), [businessId, endDate, selected.service, selected.staff, selected.startDate]);
  
  return (
    <div className={styles.confirm}>
      <p>confirm</p>
    </div>
  )
}