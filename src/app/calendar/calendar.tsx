'use client';

import styles from './calendar.module.scss';
import { Calendar, months } from '@/components/calendar/Calendar';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { ReactIconButton } from '@/components/UI/IconButton/ReactIconButton';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { Daily } from './daily';
import { useCalendarNavigation } from '@/utility/hooks/useCalendarNavigation';
import { useQuery } from '@apollo/client';
import { GET_USER_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { useEffect, useMemo, useState } from 'react';
import { AppointmentData } from '@/types/Appointment';
import { inRange } from '@/utility/functions/dateRanges/inRange';

interface CalendarProps {
  userId: string,
}

export const CalendarView: React.FC<CalendarProps> = ({userId}) => {
  const { onMonthSwitch, onReset, startDate, selected, viewing, onSelect } = useCalendarNavigation();

  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  const { data, loading, error } = useQuery(GET_USER_APPOINTMENTS, { variables: {
    userId,
  } });

  useEffect(() => {
    if (!data) return;
    setAppointments(data.getUserAppointments);
  }, [data]);

  const selectedDayAppointments = useMemo(() => appointments.filter(app => inRange(selected.map(num => new Date(num).toISOString()) as [string, string], app.start_date)), [appointments, selected]);

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
            <p onClick={onReset}>Today</p>
          </div>
        </div>
      </SecondaryHeader>
      <div className={styles.content}>
        <Daily day={selected[0]} appointments={selectedDayAppointments} userId={userId} />
        <Calendar appointments={appointments} selected={selected} onSelect={onSelect} startDate={startDate} viewing={viewing} />
      </div>
    </div>
  )
}