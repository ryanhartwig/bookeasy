import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { NewBusiness } from '@/types/Business';
import { formatTimePeriod } from '@/utility/functions/formatting/formatTimePeriod';
import { Modal } from '../UI/Modal/Modal';
import { useState } from 'react';
import { Input } from '../UI/Input/Input';
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { formatPrefPeriod } from '@/utility/functions/formatting/formatPrefPeriod';
import { PeriodSelectForm } from './PeriodSelectForm';

interface BookingSitePrefsProps {
  business: NewBusiness,
}

export const BookingSitePrefs: React.FC<BookingSitePrefsProps> = ({business}) => {

  const [initialValue, setInitialValue] = useState<number>();

  return (
    <div className={styles.BookingSitePrefs}>
      <div className={styles.header}>
        <p>Booking Site Preferences</p>
      </div>
      <div className={styles.settings}>
        <Setting label="Minimum Book Ahead" onAction={() => setInitialValue(Number(business.min_booking_notice))}>
          <p>{business.min_booking_notice ? formatPrefPeriod(Number(business.min_booking_notice)).text : 'None'}</p>
        </Setting>
        <Setting label="Maximum Book Ahead" onAction={() => setInitialValue(Number(business.max_book_ahead))}>
          <p>{business.max_book_ahead ? formatPrefPeriod(Number(business.max_book_ahead)).text : 'None'}</p>
        </Setting>
        <Setting label="Minimum Cancellation Notice" onAction={() => setInitialValue(Number(business.min_cancel_notice))}>
          <p>{business.min_cancel_notice ? formatPrefPeriod(Number(business.min_cancel_notice)).text : 'None'}</p>
        </Setting>
        <Setting label="Booking Site Url" onAction={() => setInitialValue(Number(business.min_cancel_notice))}>
          <p>{business.min_cancel_notice ? formatPrefPeriod(Number(business.min_cancel_notice)).text : 'None'}</p>
        </Setting>
      </div>
      {initialValue && <PeriodSelectForm open={!!initialValue} onClose={() => setInitialValue(undefined)} initialValue={initialValue} />}
    </div>
  )
}


