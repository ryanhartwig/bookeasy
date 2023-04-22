'use client';

import { Appointment, AppointmentData } from '@/types/Appointment';
import { BaseAvailability } from '@/types/BaseAvailability';
import { Business } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { getCurrentISOWeek } from '@/utility/functions/dateRanges/getCurrentISOWeek';
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import { getISOMonthRange } from '@/utility/functions/dateRanges/getISOMonthRange';
import { inRange } from '@/utility/functions/dateRanges/inRange';
import { GET_USER_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { userId } from '@/utility/sample_data/sample_userId';
import { useQuery } from '@apollo/client';
import { useEffect, useMemo, useState } from 'react';
import { AppointmentForm } from './appointmentForm/appointmentForm';
import styles from './dashboard.module.scss';

interface Stats {
  businesses: Business[],
  clients: Client[],
  services: Service[],
  availability: BaseAvailability[],
}

export const Stats: React.FC<Stats> = ({businesses, clients, services, availability}) => {

  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  // Use whole month range so that input is the same, therefore will use cached data
  const [rangeStart, rangeEnd] = useMemo(() => getISOMonthRange(), []);

  const { data, loading } = useQuery(GET_USER_APPOINTMENTS, {
      variables: {
        userId,
        rangeStart,
        rangeEnd,
      }
    });

    useEffect(() => {
      if (loading) return;
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
      
      <AppointmentForm availability={availability} services={services} clients={clients} businesses={businesses} open={formOpen} setOpen={setFormOpen} />
    </div>
  )
}