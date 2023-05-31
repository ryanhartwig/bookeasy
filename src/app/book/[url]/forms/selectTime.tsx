import { useState } from 'react';
import Calendar from 'react-calendar';
import styles from './forms.module.scss';
import './calendar.css';

export const SelectTime = () => {

  const [value, onChange] = useState(new Date());

  return (
    <div className={styles.selectTime}>
      <Calendar 
        tileDisabled={({activeStartDate, date, view}) => {
          console.log(date)
          return false
        }}
        minDate={new Date()} 
        onChange={(value, e) => {console.log(value)}} 
        value={value} 
      />
    </div>
  )
}