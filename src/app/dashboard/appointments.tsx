'use client';

import styles from './dashboard.module.scss';

import { AppointmentActionCard } from './appointmentActionCard';
import { useQuery } from '@apollo/client';

import { useEffect, useMemo, useState } from 'react';
import { AppointmentData } from '@/types/Appointment';
import { GET_USER_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { inRange } from '@/utility/functions/dateRanges/inRange';
import { getISOMonthRange } from '@/utility/functions/dateRanges/getISOMonthRange';
import { getISODayRange } from '@/utility/functions/dateRanges/getISODayRange';

interface AppointmentsProps {
  userId: string,
}

export const Appointments: React.FC<AppointmentsProps> = ({userId}) => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [rangeStart, rangeEnd] = useMemo(() => getISOMonthRange(), []);
  const todayRange = useMemo(() => getISODayRange(), []);

  const { data, loading, error } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userId,
      rangeStart,
      rangeEnd,
    }
  });

  useEffect(() => {
    if (loading || !data) return;
    if (error) return console.error(error.message);

    setAppointments(data.getUserAppointments
      .filter((app: AppointmentData) => inRange(todayRange, app.start_date))
    );
  }, [data, error, loading, todayRange]);

  return (
    <div className={styles.appointments}>
      {appointments.length ? appointments.map(app => {
        const app_start = new Date(app.start_date).getTime();
        const now = new Date().getTime();
        const earliestEntry = app_start - (1000 * 60 * 60);
        const latestEntry = app_start + (1000 * 60 * app.service.duration);
        const canEnterSession = earliestEntry <= now && now <= latestEntry;

        return <AppointmentActionCard 
          key={app.id} 
          app={app} 
          canEnterSession={canEnterSession} 
        />
      }) : <p className={styles.no_apps}>No appointments to show</p> }

    </div>
  )
}