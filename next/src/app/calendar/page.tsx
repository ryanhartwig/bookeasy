'use client';

import styles from './calendar.module.scss';

import { SecondaryHeader } from "@/components/SecondaryHeader"
import { Calendar, months } from '@/components/calendar/Calendar';
import { useState, useCallback } from 'react';
import { getDayRange } from '@/utility/functions/getDayRange';
import { ReactIconButton } from '@/components/UI/ReactIconButton';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Daily } from './daily';

export interface View {        
  month: number,
  year: number,
}

export default function Page() {

  const today = new Date();
  const initDate = new Date();
  initDate.setDate(1);
  initDate.setDate(initDate.getDay() * -1);

  const [selected, setSelected] = useState<[number, number]>(getDayRange());
  
  // On selecting day
  const onSelect = useCallback(([min, max]: [number, number]) => {
    setSelected([min, max]);
  }, []);

  // First date to show on the top left most cell of the calendar
  const [startDate, setStartDate] = useState<Date>(initDate);

  // Month currently selected / viewing
  const [viewing, setViewing] = useState<View>({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  // Increment / decrement month
  const onMonthSwitch = useCallback((n: number) => {
    const newDate = new Date(startDate);

    newDate.setMonth(newDate.getMonth() + n);
    
    setViewing({
      month: newDate.getMonth(),
      year: newDate.getFullYear(),
    })

    newDate.setDate(1);
    newDate.setDate(newDate.getDay() * -1);

    setStartDate(newDate);
  }, [startDate]);

  const [min, max] = getDayRange(new Date());
  const reset = useCallback(() => {
    const td = new Date();
    const init = new Date();
    init.setDate(1);
    init.setDate(init.getDay() * -1);
    
    setViewing({
      month: td.getMonth(),
      year: td.getFullYear(),
    });
    setStartDate(init);
    onSelect && onSelect([min, max]);
  }, [max, min, onSelect]);
  
  return (
    <div className={styles.calendar}>
      <SecondaryHeader>
        {/* Year/Month Select */}
        <div className='Calendar-period noselect'>
          <div className='Calendar-period-month'>
            <ReactIconButton buttonSize='30px' onClick={() => onMonthSwitch(0)} style={{borderRadius: '12px'}}>
              <AiOutlineLeft size={15}/>
            </ReactIconButton> 
            <h2>{months[viewing.month]}</h2>

            <ReactIconButton buttonSize='30px' onClick={() => onMonthSwitch(2)} style={{borderRadius: '12px'}}>
              <AiOutlineRight size={15}/>
            </ReactIconButton>
          </div>
          <div className='Calendar-reset'>
            <h2>{viewing.year}</h2>
            <p onClick={reset}>Today</p>
          </div>
        </div>
      </SecondaryHeader>
      <div className={styles.content}>
        <Daily day={selected[0]} />
        <Calendar selected={selected} onSelect={onSelect} startDate={startDate} viewing={viewing} />
      </div>
    </div>
  )
}