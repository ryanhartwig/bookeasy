import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { BusinessPrefs } from '@/types/BusinessPrefs';
import { formatTimePeriod } from '@/utility/functions/formatTimePeriod';

interface BookingSitePrefsProps {
  business_prefs: BusinessPrefs,
}

export const BookingSitePrefs: React.FC<BookingSitePrefsProps> = ({business_prefs}) => {

  return (
    <div className={styles.BookingSitePrefs}>
      <div className={styles.header}>
        <p>Booking Site Preferences</p>
      </div>
      <div className={styles.settings}>
        <Setting label="Minimum Book Ahead">
          <p>{business_prefs.min_booking_notice ? formatTimePeriod(business_prefs.min_booking_notice) : 'None'}</p>
        </Setting>
        <Setting label="Maximum Book Ahead">
          <p>{business_prefs.max_book_ahead ? formatTimePeriod(business_prefs.max_book_ahead) : 'None'}</p>
        </Setting>
        <Setting label="Minimum Cancellation Notice">
          <p>{business_prefs.min_cancel_notice ? formatTimePeriod(business_prefs.min_cancel_notice) : 'None'}</p>
        </Setting>
        <Setting label="Booking Site Url">
          <p>{business_prefs.min_cancel_notice ? formatTimePeriod(business_prefs.min_cancel_notice) : 'None'}</p>
        </Setting>
      </div>
    </div>
  )
}


