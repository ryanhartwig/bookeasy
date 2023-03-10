'use client';

import './Calendar.css';
import { Days } from './Days';
import { View } from '@/app/calendar/page';

import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import { useState } from 'react';
import { Appointment } from '@/types/Appointment';
import { getDayRange } from '@/utility/functions/getDayRange';

interface CalendarProps {
  selected?: [number, number],
  onSelect?: ([min, max]: [number, number]) => any,
  startDate: Date,
  viewing: View,
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

export const Calendar = ({startDate, onSelect, selected, viewing}: CalendarProps) => {

    
  const startEnd = new Date(startDate);
  startEnd.setDate(startEnd.getDate() + 1);
  const [start] = getDayRange(startEnd);

  startEnd.setDate(startEnd.getDate() + 41);
  const [_, end] = getDayRange(startEnd);

  console.log(startDate.toDateString());
  console.log(new Date(start).toDateString());
  console.log(new Date(end).toDateString());

  // This will be fetched & revalidated on updates, and will only include appointments for the current month
  const [appointments, setAppointments] = useState<Appointment[]>(sample_appointments.filter(app => {
    
  }));

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