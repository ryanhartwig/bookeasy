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

          
          return <div key={i}>
                
          </div>
        })}
      </div>
    </div>
  )
}