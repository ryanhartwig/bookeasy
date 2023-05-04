import React from 'react';
import styles from './-lists.module.scss';

export const PeriodList = (setValue: React.Dispatch<React.SetStateAction<any>>) => {
  
  return new Array(2).fill(0).map((_, i) => (
    <div key={i} className={styles.option} onClick={() => setValue(!i ? 'am' : 'pm')}>
      <p>{!i ? 'am' : 'pm'}</p>
    </div>
  ));
}