import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import styles from './weekly_overview.module.scss';

export const WeekDayNames = () => {
  const days = new Array(7).fill(true);
  const [start] = getCurrentWeek();
  return (
    <div className={styles.weekdays} style={{paddingRight: 15}}>
      {days.map((_, i) => {
        const thisDay = new Date(start);
        thisDay.setDate(thisDay.getDate() + i);

        const [day, month, date] = thisDay.toDateString().split(' ');
        const color = thisDay.getDate() === new Date().getDate()
          ? '#216FDB'
          : 'inherit';
        
        return <div key={`day-${i}`}>
          <p style={{color}}>{day}</p>
          <p style={{color}}>{month} {date}</p>
        </div>
      })}
    </div>
  )
}