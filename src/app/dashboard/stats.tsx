'use client';

import { Appointment } from '@/types/Appointment';
import { Business } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import { useState } from 'react';
import { AppointmentForm } from './appointmentForm/appointmentForm';
import styles from './dashboard.module.scss';

interface Stats {
  appointments: Appointment[],
  businesses: Business[],
  clients: Client[],
  services: Service[],
}

export const Stats: React.FC<Stats> = ({appointments, businesses, clients, services}) => {

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
      
      <AppointmentForm services={services} clients={clients} businesses={businesses} open={formOpen} setOpen={setFormOpen} />
    </div>
  )
}