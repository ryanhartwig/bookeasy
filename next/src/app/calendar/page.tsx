import styles from './calendar.module.scss';


import { SecondaryHeader } from "@/components/SecondaryHeader"
import { Calendar } from '@/components/calendar/Calendar';

export default function Page() {
  
  return (
    <div className={styles.calendar}>
      <SecondaryHeader>

      </SecondaryHeader>
      <div className={styles.content}>
        <Calendar />
      </div>
    </div>
  )
}