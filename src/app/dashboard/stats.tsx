'use client';

import { AppointmentData } from '@/types/Appointment';
import { getCurrentISOWeek } from '@/utility/functions/dateRanges/getCurrentISOWeek';
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import { getISOMonthRange } from '@/utility/functions/dateRanges/getISOMonthRange';
import { inRange } from '@/utility/functions/dateRanges/inRange';
import { GET_USER_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { AppointmentForm } from './appointmentForm/appointmentForm';
import styles from './dashboard.module.scss';

interface StatsProps {
  userId: string,
}

export const Stats: React.FC<StatsProps> = ({userId}) => {

  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  // Use whole month range so that input is the same, (and will therefore use cached data for subsequent request)
  const [rangeStart, rangeEnd] = useMemo(() => getISOMonthRange(), []);

  const { data, loading } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userId,
      rangeStart,
      rangeEnd,
    }
  });


  useEffect(() => console.log(appointments));
  useEffect(() => {
    if (loading || !data) return;
    console.log('from stats component: ', data.getUserAppointments);
    setAppointments(data.getUserAppointments.filter((app: AppointmentData) => inRange(getCurrentISOWeek(), app.start_date)));
  }, [data, loading]);
  
  const [start, end] = getCurrentWeek();
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <div className={styles.header}>
      <div className={styles.stat}>
        <p style={{fontWeight: 100}}>Week of</p>
        <p className={styles.headerLarge}>
          {`${start.toDateString().split(' ').slice(1, 3).join(' ')}`} - {`${end.toDateString().split(' ').slice(1, 3).join(' ')}`}
        </p>
      </div>
      <div className={styles.stat}>
        <p className={styles.headerLarge}>{appointments.length}</p>
        <p style={{fontWeight: 100}}>Appointments</p>
      </div>
      <div className={styles.stat}>
        <p className={styles.headerLarge}>$0.00</p>
        <p style={{fontWeight: 100}}>Projected</p>
      </div>

      <div className={styles.addApointment}>
        <div onClick={() => setFormOpen(true)}>
          <p>+ Add Appointment</p>
        </div>
      </div>
      
      <AppointmentForm userId={userId} open={formOpen} setOpen={setFormOpen} />
    </div>
  )
}