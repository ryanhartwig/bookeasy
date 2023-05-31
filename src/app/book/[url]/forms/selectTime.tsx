import { useEffect, useLayoutEffect, useState } from 'react';
import Calendar from 'react-calendar';
import styles from './forms.module.scss';
import './calendar.css';
import { NewBusiness } from '@/types/Business';

interface SelectTimeProps {
  business: NewBusiness,
}

export const SelectTime: React.FC<SelectTimeProps> = ({business}) => {
  const minDate = new Date();
  minDate.setTime(minDate.getTime() + Number(business.min_booking_notice ?? 0));
  let maxDate: Date | undefined = undefined;
  if (business.max_book_ahead) {
    maxDate = new Date();
    maxDate.setTime(maxDate.getTime() + Number(business.max_book_ahead));
  }

  const [value, onChange] = useState(minDate);


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
        minDate={minDate} 
        maxDate={maxDate}
        onChange={(value, e) => { onChange(new Date(value as Date))}} 
        value={value} 
      />
    </div>
  )
}