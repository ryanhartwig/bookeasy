import { Setting } from '@/components/UI/Setting/Setting';
import styles from './tabs.module.scss';

import { sample_business_prefs } from '@/utility/sample_data/sample_business_prefs';
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
      </div>
    </div>
  )
}


