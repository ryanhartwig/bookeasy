import React from 'react';
import styles from './-lists.module.scss';

interface PeriodListProps {
  setValue: React.Dispatch<React.SetStateAction<any>>,
}

export const PeriodList = ({setValue}: PeriodListProps) => {
  
  return new Array(2).fill(0).map((_, i) => (
    <div key={i} className={styles.option} onClick={() => setValue(!i ? 'am' : 'pm')}>
      <p>{!i ? 'am' : 'pm'}</p>
    </div>
  ));
}