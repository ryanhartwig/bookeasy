import styles from './dashboard.module.scss';

interface WeekViewProps {
  start: Date,
}

export const WeekView: React.FC<WeekViewProps> = ({start}) => {
  const days = new Array(7).fill(true);

  return (
    <div className={styles.weekview}>
      <div className={styles.weekdays}>
        {days.map((_, i) => {
          const thisDay = new Date(start);
          thisDay.setDate(thisDay.getDate() + i);
          
          const [day, month, date] = thisDay.toDateString().split(' ');
          
          return <div key={i}>
            <p>{day}</p>
            <p>{month} {date}</p>
          </div>
        })}
      </div>
    </div>
  )
}