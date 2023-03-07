'use client';

import styles from './dashboard.module.scss';

/* 

Formula to convert hours / mins into index:

  (Date.getHours() * 4) + (Date.getMinutes() / 15)

*/

export const Hours = () => {
  const blocks = new Array(96).fill(true);

  
  return (
    <div className={styles.hours}>
      {blocks.map((_, i) => {
        const borderBottomColor = i % 4 === 3 ? '#A3A3A3' : '';

        const isHour = i % 4 === 0;
        let hourIndex = 0;
        let hour = 0;
        let period = '';

        if (isHour) {
          hourIndex = i / 4;
          hour = hourIndex % 12 === 0 ? 12 : hourIndex % 12;
          period = hourIndex < 12 ? 'am' : 'pm';
        }


        return (
          <div key={i} className={styles.block} style={{borderBottomColor}}>
            <div className={styles.cover} />
            {isHour && <p>{hour} {period}</p>}
          </div>
        )
      })}
    </div>
  )
}