import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { NewBusiness } from '@/types/Business';
import { formatTimePeriod } from '@/utility/functions/formatting/formatTimePeriod';

interface BookingSitePrefsProps {
  business: NewBusiness,
}

export const BookingSitePrefs: React.FC<BookingSitePrefsProps> = ({business}) => {

  return (
    <div className={styles.BookingSitePrefs}>
      <div className={styles.header}>
        <p>Booking Site Preferences</p>
      </div>
      <div className={styles.settings}>
        <Setting label="Minimum Book Ahead">
          <p>{business.min_booking_notice ? formatTimePeriod(Number(business.min_booking_notice)) : 'None'}</p>
        </Setting>
        <Setting label="Maximum Book Ahead">
          <p>{business.max_book_ahead ? formatTimePeriod(Number(business.max_book_ahead)) : 'None'}</p>
        </Setting>
        <Setting label="Minimum Cancellation Notice">
          <p>{business.min_cancel_notice ? formatTimePeriod(Number(business.min_cancel_notice)) : 'None'}</p>
        </Setting>
        <Setting label="Booking Site Url">
          <p>{business.min_cancel_notice ? formatTimePeriod(Number(business.min_cancel_notice)) : 'None'}</p>
        </Setting>
      </div>
    </div>
  )
}


