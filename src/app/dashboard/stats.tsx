'use client';

import { Modal } from '@/components/UI/Modal/Modal';
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
      <div>
        <p style={{fontWeight: 100}}>Week of</p>
        <p className={styles.headerLarge}>
          {`${start.toDateString().split(' ').slice(1, 3).join(' ')}`} - {`${end.toDateString().split(' ').slice(1, 3).join(' ')}`}
        </p>
      </div>
      <div>
        <p className={styles.headerLarge}>{appointments.length}</p>
        <p style={{fontWeight: 100}}>Appointments</p>
      </div>
      <div>
        <p className={styles.headerLarge}>$0.00</p>
        <p style={{fontWeight: 100}}>Projected</p>
      </div>

      <div className={styles.addApointment}>
        <div>
          <p>+ Add Appointment</p>
        </div>
      </div>
      
      <Modal open={addAppFormOpen} onClose={() => setAddAppFormOpen(false)} >

      </Modal>

    </div>
  )
}