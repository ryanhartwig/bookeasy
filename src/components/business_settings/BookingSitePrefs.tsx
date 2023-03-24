import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { formatTimePeriod } from '@/utility/functions/formatTimePeriod';
import { Business } from '@/types/Business';

interface BookingSitePrefsProps {
  business: Business,
}

export const BookingSitePrefs: React.FC<BookingSitePrefsProps> = ({business}) => {

  return (
    <div className={styles.BookingSitePrefs}>
      <div className={styles.header}>
        <p>Booking Site Preferences</p>
      </div>
      <div className={styles.settings}>
        <Setting label="Minimum Book Ahead">
          <p>{business.prefs.min_booking_notice ? formatTimePeriod(business.prefs.min_booking_notice) : 'None'}</p>
        </Setting>
        <Setting label="Maximum Book Ahead">
          <p>{business.prefs.max_book_ahead ? formatTimePeriod(business.prefs.max_book_ahead) : 'None'}</p>
        </Setting>
        <Setting label="Minimum Cancellation Notice">
          <p>{business.prefs.min_cancel_notice ? formatTimePeriod(business.prefs.min_cancel_notice) : 'None'}</p>
        </Setting>
        <Setting label="Booking Site Url">
          <p>{business.prefs.min_cancel_notice ? formatTimePeriod(business.prefs.min_cancel_notice) : 'None'}</p>
        </Setting>
      </div>
    </div>
  )
}


