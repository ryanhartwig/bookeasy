import { useEffect, useLayoutEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styles from './forms.module.scss';
import './calendar.css';

export const SelectTime = () => {

  const [value, onChange] = useState(new Date());


  useEffect(() => {
    // Cannot access JSX element with useRef, so we querySelector and remove tabindex
    const element = document.querySelector('.react-calendar__navigation__label');
    if (!element) return;
    element.setAttribute('tabindex', '-1');
  },[]);

  return (
    <div className={styles.selectTime}>
      <Calendar 
        tileDisabled={({activeStartDate, date, view}) => {
          console.log(date)
          return false
        }}
        minDate={new Date()} 
        onChange={(value, e) => { onChange(new Date(value as Date))}} 
        value={value} 
      />
    </div>
  )
}