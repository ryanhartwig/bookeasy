'use client';

import styles from './dashboard.module.scss';

import { Appointment } from '@/types/Appointment';

import { Service } from '@/types/Service';
import { Client } from '@/types/Client';
import { AppointmentActionCard } from './appointmentActionCard';

interface AppointmentsProps {
  appointments: Appointment[],
  services: Service[],
  clients: Client[],
}

export const Appointments: React.FC<AppointmentsProps> = ({appointments, services, clients}) => {

  return (
    <div className={styles.appointments}>
      {appointments.length ? appointments.map(app => {
        const service = services.find(s => app.serviceId === s.id);
        if (!service) return <></>
        const canEnterSession = Date.now() < app.startDate + (1000 * 60 * service.duration) && Date.now() > app.startDate - (1000 * 60 * 60);

        return <AppointmentActionCard 
          key={app.id} 
          service={service} 
          app={app} 
          client={clients.find(c => c.id === app.clientId)!} 
          canEnterSession={canEnterSession} 
        />
      }) : <p className={styles.no_apps}>No appointments to show</p> }

    </div>
  )
}