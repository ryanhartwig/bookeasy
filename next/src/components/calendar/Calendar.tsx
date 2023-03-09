'use client';

import './Calendar.css';
import { Days } from './Days';
import { View } from '@/app/calendar/page';

interface CalendarProps {
  selected?: [number, number],
  onSelect?: ([min, max]: [number, number]) => any,
  startDate: Date,
  viewing: View,
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const Calendar = ({startDate, onSelect, selected, viewing}: CalendarProps) => {

  return (
    <div className='Calendar'>
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