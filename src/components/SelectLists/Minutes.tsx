import React from 'react';
import styles from './-lists.module.scss';

export const MinutesList = (setValue: React.Dispatch<React.SetStateAction<any>>) => {
  
  return new Array(4).fill(0).map((_, i) => (
    <div key={'mlist' + i} className={styles.option} onClick={() => setValue(i * 15)}>
      <p>{i * 15}</p>
    </div>
  ));
}