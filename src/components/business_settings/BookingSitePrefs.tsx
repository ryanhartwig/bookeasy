import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { NewBusiness } from '@/types/Business';
import { formatTimePeriod } from '@/utility/functions/formatting/formatTimePeriod';
import { Modal } from '../UI/Modal/Modal';
import { useState } from 'react';
import { Input } from '../UI/Input/Input';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';

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
          <div className={styles.durationSelect}>
            <AiOutlineMinusCircle onClick={() => setMonths(p => p === 0 ? p : p - 1)} />
            <p>{months}</p>
            <AiOutlinePlusCircle onClick={() => setMonths(p => p + 1)} />
          </div>

          <p>Weeks</p>
          <div className={styles.durationSelect}>
            <AiOutlineMinusCircle onClick={() => setWeeks(p => p === 0 ? p : p - 1)} />
            <p>{weeks}</p>
            <AiOutlinePlusCircle onClick={() => setWeeks(p => p + 1)} />
          </div>

          <p>Days</p>
          <div className={styles.durationSelect}>
            <AiOutlineMinusCircle onClick={() => setDays(p => p === 0 ? p : p - 1)} />
            <p>{days}</p>
            <AiOutlinePlusCircle onClick={() => setDays(p => p + 1)} />
          </div>

          <p>Hours</p>
          <div className={styles.durationSelect}>
            <AiOutlineMinusCircle onClick={() => setHours(p => p === 0 ? p : p - 1)} />
            <p>{hours}</p>
            <AiOutlinePlusCircle onClick={() => setHours(p => p + 1)} />
          </div>
        </div>
      </Modal>
    </div>
  )
}


