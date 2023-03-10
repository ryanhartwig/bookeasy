'use client';

import './Calendar.css';
import { Days } from './Days';
import { View } from '@/app/calendar/page';

import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import { useEffect, useMemo, useState } from 'react';
import { Appointment } from '@/types/Appointment';
import { getDayRange } from '@/utility/functions/getDayRange';

interface CalendarProps {
  selected?: [number, number],
  onSelect?: ([min, max]: [number, number]) => any,
  startDate: Date,
  viewing: View,
  appointments: Appointment[],
}

export const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
export const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

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