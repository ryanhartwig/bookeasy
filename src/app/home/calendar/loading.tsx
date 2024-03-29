
import { Header } from '@/components/Header';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { ReactIconButton } from '@/components/UI/IconButton/ReactIconButton';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Card } from '@/components/UI/Card/Card';
import { months, days } from '@/utility/data/calendarData';

import calendarStyles from './calendar.module.scss';
import styles from './daily.module.scss';
import '@/components/calendar/Calendar.css';
import { LoadingDots } from '@/components/UI/LoadingDots/LoadingDots';

export default function Loading() {
  const viewing = {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  };
  
  return (
    <>
      <Header text='Calendar' loading />
      <div className={calendarStyles.calendar}>
        <SecondaryHeader>
          {/* Year/Month Select */}
          <div className='Calendar-period noselect'>
            <div className='Calendar-period-month'>
              <ReactIconButton buttonSize='30px'>
                <AiOutlineLeft size={15}/>
              </ReactIconButton> 
              <h2>{months[viewing.month]}</h2>
              <ReactIconButton buttonSize='30px' style={{borderRadius: '12px'}}>
                <AiOutlineRight size={15}/>
              </ReactIconButton>
            </div>
            <div className='Calendar-reset'>
              <h2>{viewing.year}</h2>
              <p>Today</p>
            </div>
          </div>
        </SecondaryHeader>
        <div className={calendarStyles.content}>
          <div className={styles.daily}>
            {/* <Spinner size={15} style={{margin: '0 auto 5px'}} /> */}
            <LoadingDots size={4} style={{padding: '8px 0'}} />
            <div className={styles.day_wrapper}>
              <Card className={styles.day_card} style={{height: '100%'}}>
              </Card> 
            </div>
          </div>
          <div className='Calendar'>
            {/* Day of the Week */}
            <div className='Calendar-days'>
              {days.map(d => <p key={d}>{d.slice(0, 3)}</p>)}
            </div>
            
            {/* Calendar Days */}
            <div className='Calendar-fields-wrapper noselect'>
              <div className={styles.skeletonCalendar}>
                {new Array(6).fill(true).map((i) => (
                  <div key={'weeks' + i} className={styles.skeletonCalendarWeek}>
                    {new Array(7).fill(true).map((i) => (
                      <div key={'days' + i} className={styles.skeletonCalendarDay} />
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}