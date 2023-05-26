'use client';

import './Calendar.css';
import { Days } from './Days';

import { AppointmentData } from '@/types/Appointment';
import { View } from '@/app/home/calendar/calendar';
import { days } from '@/utility/data/calendarData';

interface CalendarProps {
  selected?: [number, number],
  onSelect?: ([min, max]: [number, number]) => any,
  startDate: Date,
  viewing: View,
  appointments: AppointmentData[],
}


export const Calendar: React.FC<CalendarProps> = ({startDate, onSelect, selected, viewing, appointments}) => {

  return (
    <div className='Calendar'>
      {/* Day of the Week */}
      <div className='Calendar-days'>
        {days.map(d => <p key={d}>{d.slice(0, 3)}</p>)}
      </div>
      
      {/* Calendar Days */}
      <div className='Calendar-fields-wrapper noselect'>
        <Days appointments={appointments} date={startDate} viewing={viewing} onSelect={onSelect} selected={selected} />
      </div>
    </div>
  )
}