'use client';

import styles from './dashboard.module.scss';

import { AppointmentData } from '@/types/Appointment';

import { AppointmentActionCard } from './appointmentActionCard';
import { useQuery } from '@apollo/client';

interface AppointmentsProps {
  appointments: AppointmentData[],
}

import { gql } from '@apollo/client';
import { useEffect } from 'react';
import { userId } from '@/utility/sample_data/sample_userId';

const query = gql`
  query($userId: ID!) {
    getUserAppointments(user_id: $userId) {
      start_date
    }
  } 
`;

export const Appointments: React.FC<AppointmentsProps> = ({appointments}) => {

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