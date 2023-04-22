'use client';

import styles from './dashboard.module.scss';

import { AppointmentActionCard } from './appointmentActionCard';
import { useQuery } from '@apollo/client';

import { gql } from '@apollo/client';
import { useEffect, useState } from 'react';
import { AppointmentData } from '@/types/Appointment';

const query = gql`
  query($userId: ID!) {
    getUserAppointments(user_id: $userId) {
      start_date
    }
  } 
`;

interface AppointmentsProps {
  userId: string,
}

export const Appointments: React.FC<AppointmentsProps> = ({userId}) => {

  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  const { data, loading } = useQuery(query, {
    variables: {
      userId,
    }
  });

  useEffect(() => {
    if (loading) return;
    console.log(data);
  }, [data, loading]);

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