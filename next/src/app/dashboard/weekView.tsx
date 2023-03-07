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
          const color = thisDay.getDate() === new Date().getDate()
            ? '#216FDB'
            : '';
          
          return <div key={i}>
            <p style={{color}}>{day}</p>
            <p style={{color}}>{month} {date}</p>
          </div>
        })}
      </div>
    </div>
  )
}