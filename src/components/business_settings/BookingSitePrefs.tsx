import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { NewBusiness } from '@/types/Business';
import { formatTimePeriod } from '@/utility/functions/formatting/formatTimePeriod';
import { Modal } from '../UI/Modal/Modal';
import { useCallback, useState } from 'react';
import { Input } from '../UI/Input/Input';

interface BookingSitePrefsProps {
  business: NewBusiness,
}

export const BookingSitePrefs: React.FC<BookingSitePrefsProps> = ({business}) => {

  const [months, setMonths] = useState<number>(0);
  const [weeks, setWeeks] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);
  
  const [formOpen, setFormOpen] = useState<boolean>(false);

  return (
    <div className={styles.BookingSitePrefs}>
      <div className={styles.header}>
        <p>Booking Site Preferences</p>
      </div>
      <div className={styles.settings}>
        <Setting label="Minimum Book Ahead" onAction={() => setFormOpen(true)}>
          <p>{business.min_booking_notice ? formatTimePeriod(Number(business.min_booking_notice)) : 'None'}</p>
        </Setting>
        <Setting label="Maximum Book Ahead" onAction={() => setFormOpen(true)}>
          <p>{business.max_book_ahead ? formatTimePeriod(Number(business.max_book_ahead)) : 'None'}</p>
        </Setting>
        <Setting label="Minimum Cancellation Notice" onAction={() => setFormOpen(true)}>
          <p>{business.min_cancel_notice ? formatTimePeriod(Number(business.min_cancel_notice)) : 'None'}</p>
        </Setting>
        <Setting label="Booking Site Url" onAction={() => setFormOpen(true)}>
          <p>{business.min_cancel_notice ? formatTimePeriod(Number(business.min_cancel_notice)) : 'None'}</p>
        </Setting>
      </div>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} >
        <Modal.Header>Select Time Period</Modal.Header>
        <div className={styles.periodSelect}>
          <p>Months</p>
          <Input className={styles.periodInput} type='number' value={months} title='months' onChange={(e) => Number(e.target.value) > 0 && setMonths(Number(e.target.value))} />

          <p>Weeks</p>
          <Input className={styles.periodInput} type='number' value={weeks} onChange={(e) => Number(e.target.value) > 0 && setWeeks(Number(e.target.value))} />

          <p>Days</p>
          <Input className={styles.periodInput} type='number' value={days} onChange={(e) => Number(e.target.value) > 0 && setDays(Number(e.target.value))} />

          <p>Hours</p>
          <Input className={styles.periodInput} type='number' value={hours} onChange={(e) => Number(e.target.value) > 0 && setHours(Number(e.target.value))} />
        </div>
      </Modal>
    </div>
  )
}


