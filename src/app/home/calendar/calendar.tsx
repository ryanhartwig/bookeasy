'use client';

import styles from './calendar.module.scss';
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
import { getISOMonthRange } from '@/utility/functions/dateRanges/getISOMonthRange';
import { useUser } from '@/app/Providers';
import { Calendar } from '@/components/calendar/Calendar';
import { months } from '@/utility/data/calendarData';
import { Spinner } from '@/components/UI/Spinner/Spinner';

export interface View {        
  month: number,
  year: number,
}

export const CalendarView = () => {
  const { id: userId } = useUser();
  const { onMonthSwitch, onReset, startDate, selected, viewing, onSelect } = useCalendarNavigation();

  const [appointments, setAppointments] = useState<AppointmentData[]>([]);

  // 14 days ahead assures second getMonthRange() helper function resets to the correct start date
  const [rangeStart, rangeEnd] = useMemo(() => getISOMonthRange(new Date(startDate.getTime() + 1000 * 60 * 60 * 24 * 14)), [startDate]);

  const { data, loading } = useQuery(GET_USER_APPOINTMENTS, { variables: {
    userId,
    rangeStart,
    rangeEnd,
  }});
  
  useEffect(() => {
    if (!data) return;
    setAppointments(data.getUserAppointments);
  }, [data, loading, rangeStart]);

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

            {loading && <Spinner style={{marginLeft: 20}} />}
            {loading && <p className={styles.loading}>Loading appointments...</p>}
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