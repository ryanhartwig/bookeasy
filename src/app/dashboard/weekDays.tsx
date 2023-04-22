'use client';

import styles from './weekly_overview.module.scss';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Hours } from './hours';
import { useOptimizedResize } from '@/utility/hooks/useOptimizedResize';
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';

import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { Appointment, AppointmentData } from '@/types/Appointment';
import { getDayRange } from '@/utility/functions/dateRanges/getDayRange';
import { inRange } from '@/utility/functions/dateRanges/inRange';
import { GET_USER_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { useQuery } from '@apollo/client';
import { getISOMonthRange } from '@/utility/functions/dateRanges/getISOMonthRange';

interface WeekDaysProps {
  userId: string,
}

export const WeekDays: React.FC<WeekDaysProps> = ({userId}) => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [rangeStart, rangeEnd] = useMemo(() => getISOMonthRange(), []);
  
  const { data, loading } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userId,
      rangeStart,
      rangeEnd,
    }
  });

  useEffect(() => {
    if (loading) return;
    setAppointments(data.getUserAppointments);
  }, [data.getUserAppointments, loading]);

  const days = Array(7).fill(true);
  const hourlyRef = useRef<HTMLDivElement>(undefined!);

  const [width, setWidth] = useState<string>('auto');
  const [start] = getCurrentWeek();

  const wrapperRef = useRef<HTMLDivElement>(undefined!);
  const wrapperWidth = useOptimizedResize(wrapperRef, '100%');

  useEffect(() => {
    setWidth(`calc(100% + ${hourlyRef.current.offsetWidth - hourlyRef.current.clientWidth}px)`)
  }, []);

  return (
    <div className={styles.hourlywrapper} ref={wrapperRef} style={{width: wrapperWidth}}>
      <div className={styles.hourly} ref={hourlyRef} style={{width}}>
        {days.map((_, i) => {
          const date = new Date(start);
          date.setDate(date.getDate() + i);

          const [dayStart, dayEnd] = getDayRange(date);
          const thisDayApps = appointments.filter((app) => dayStart <= app.startDate && dayEnd >= app.startDate);
          
          return <Hours key={i} day={i} appointments={thisDayApps} />
        })}
      </div>
    </div>
  )
}