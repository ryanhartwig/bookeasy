import React from 'react';
import styles from './-lists.module.scss';

export const HoursList = (setValue: React.Dispatch<React.SetStateAction<any>>) => {
  
  return new Array(12).fill(0).map((_, i) => (
    <div key={i} className={styles.option} onClick={() => setValue(i + 1)}>
      <p>{i + 1}</p>
    </div>
  ));
}