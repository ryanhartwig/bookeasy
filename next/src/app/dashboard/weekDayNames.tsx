import styles from './weekly_overview.module.scss';

interface WeekDayNames {
  start: Date,
}

export const WeekDayNames: React.FC<WeekDayNames> = ({start}) => {
  const days = new Array(7).fill(true);

  return (
    <div className={styles.weekdays}>
      {days.map((_, i) => {
        const thisDay = new Date(start);
        thisDay.setDate(thisDay.getDate() + i);

        const [day, month, date] = thisDay.toDateString().split(' ');
        const color = thisDay.getDate() === new Date().getDate()
          ? '#216FDB'
          : 'inherit';
        
        return <div key={i}>
          <p style={{color}}>{day}</p>
          <p style={{color}}>{month} {date}</p>
        </div>
      })}
    </div>
  )
}