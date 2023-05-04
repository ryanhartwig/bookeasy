import React from 'react';
import styles from './-lists.module.scss';

interface MinutesListProps {
  setValue: React.Dispatch<React.SetStateAction<any>>,
}

export const MinutesList = ({setValue}: MinutesListProps) => {
  
  return new Array(4).fill(0).map((_, i) => (
    <div key={i} className={styles.option} onClick={() => setValue(i * 15)}>
      <p>{i * 15}</p>
    </div>
  ));
}