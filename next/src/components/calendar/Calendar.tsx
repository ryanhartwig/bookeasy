import './Calendar.css';

import { Days } from './Days';

/* React Icons */
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { ReactIconButton } from '../ui/ReactIconButton';
import { useCallback, useState } from 'react';
import { days, months } from '../../utility/data/days_months';
import { minMaxDate } from '../../utility/helpers/minMaxDate';

interface CalendarProps {
  showOptions?: boolean,
  selected?: [number, number],
  onSelect?: ([min, max]: [number, number]) => any,
}
interface View {
  month: number,
  year: number,
}

export const Calendar = ({showOptions, onSelect, selected}: CalendarProps) => {

  const today = new Date();
  const initDate = new Date();
  initDate.setDate(1);
  initDate.setDate(initDate.getDay() * -1);

  // Month currently selected / viewing
  const [viewing, setViewing] = useState<View>({
    month: today.getMonth(),
    year: today.getFullYear(),
  });

  // First date to show on the top left most cell of the calendar
  const [startDate, setStartDate] = useState<Date>(initDate);

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

  const [min, max] = minMaxDate(new Date());
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

  const blockInc = viewing.month === today.getMonth() && viewing.year === today.getFullYear();

  return (
    <div className='Calendar'>
      {/* Year/Month Select */}
      <div className='Calendar-period noselect'>
        <div className='Calendar-period-month'>
          {/* Month with < / > inc options when showOptions is true */}
          {showOptions && 
            <ReactIconButton buttonSize='30px' onClick={() => onMonthSwitch(0)} style={{borderRadius: '12px'}}>
              <AiOutlineLeft size={15}/>
            </ReactIconButton> }

          <h2>{months[viewing.month]}</h2>

          {!blockInc && showOptions &&  
            <ReactIconButton buttonSize='30px' onClick={() => onMonthSwitch(2)} style={{borderRadius: '12px'}}>
              <AiOutlineRight size={15}/>
            </ReactIconButton>}
        </div>
        <div className='Calendar-reset'>
          <h2>{viewing.year}</h2>
          {showOptions && <p onClick={reset}>Today</p>}
        </div>
      </div>

      {/* Day of the Week */}
      <div className='Calendar-days'>
        {days.map(d => <p key={d}>{d.slice(0, 3)}</p>)}
      </div>
      
      {/* Calendar Days */}
      <div className='Calendar-fields-wrapper noselect'>
        <Days date={startDate} viewing={viewing} onSelect={onSelect} selected={selected} />
      </div>
    </div>
  )
}