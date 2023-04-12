'use client';

import { Modal } from '@/components/UI/Modal/Modal';
import { Select } from '@/components/UI/Select/Select';
import { Appointment } from '@/types/Appointment';
import { Business } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import { userId } from '@/utility/sample_data/sample_userId';
import { useState } from 'react';
import { AppointmentActionCard } from './appointmentActionCard';
import styles from './dashboard.module.scss';

interface Stats {
  appointments: Appointment[],
}

export const Stats: React.FC<Stats> = ({appointments}) => {

  const [start, end] = getCurrentWeek();
  const [addAppFormOpen, setAddAppFormOpen] = useState<boolean>(false);

  const [selectedService, setSelectedService] = useState<Service>();
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedBusiness, setSelectedBusiness] = useState<Business>();

  const [appointment, setAppointment] = useState<Appointment>({
    businessId: "",
    clientId: "",
    endDate: 0,
    id: "",
    isPaid: false,
    isVideo: false,
    serviceCost: 0,
    serviceDuration: 0,
    serviceId: "",
    serviceName: "...",
    serviceProvider: "...",
    startDate: 0,
    userId: userId,
  });


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
        <div onClick={() => setAddAppFormOpen(true)}>
          <p>+ Add Appointment</p>
        </div>
      </div>
      
      <Modal actionButtonText='Confirm' open={addAppFormOpen} onClose={() => setAddAppFormOpen(false)} className={styles.appointmentForm}>
        <Modal.Header>Create an Appointment</Modal.Header>
        <div className={styles.appointmentOptions}>
          <p>Select a provider</p>
          <Select list={[]} placeholder="..." />
          <p>Select a client</p>
          <Select list={[]} placeholder="..." />
          <p>Select a service</p>
          <Select list={[]} placeholder="..." />
          <p>Select date and time</p>
          <Select list={[]} placeholder="..." />
          
        </div>
        <hr />
        <p className={styles.appointmentDate}>...</p>        
        <AppointmentActionCard 
          app={appointment} 
          service={selectedService ?? {color: 'blue', name: '...', duration: 0} as Service} 
          client={selectedClient ?? {name: '...'} as Client}
          mini
        />
        <p className={styles.warning}>warning: this appointment falls out of booking hours</p>
      </Modal>

    </div>
  )
}