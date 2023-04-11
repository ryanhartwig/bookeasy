'use client';

import { Modal } from '@/components/UI/Modal/Modal';
import { Select } from '@/components/UI/Select/Select';
import { Appointment } from '@/types/Appointment';
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import { useState } from 'react';
import styles from './dashboard.module.scss';

interface Stats {
  appointments: Appointment[],
}

export const Stats: React.FC<Stats> = ({appointments}) => {

  const [start, end] = getCurrentWeek();
  const [addAppFormOpen, setAddAppFormOpen] = useState<boolean>(false);

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
      
      <Modal open={addAppFormOpen} onClose={() => setAddAppFormOpen(false)} className={styles.appointmentForm}>
        <Modal.Header>Create an Appointment</Modal.Header>
        <div style={{width: '80%', margin: '0 auto', textAlign: 'center'}}>
          <p>Select a provider</p>
          <Select list={[<p key="1">test</p>, <p key="2">tester</p>]} />
        </div>
        
      </Modal>

    </div>
  )
}