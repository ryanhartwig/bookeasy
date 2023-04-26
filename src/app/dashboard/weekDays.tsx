  'use client';

import styles from './weekly_overview.module.scss';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Hours } from './hours';
import { useOptimizedResize } from '@/utility/hooks/useOptimizedResize';
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';

import { AppointmentData } from '@/types/Appointment';
import { inRange } from '@/utility/functions/dateRanges/inRange';
import { GET_USER_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { useQuery } from '@apollo/client';
import { getISOMonthRange } from '@/utility/functions/dateRanges/getISOMonthRange';
import { getISODayRange } from '@/utility/functions/dateRanges/getISODayRange';
import { AppointmentForm } from './appointmentForm/appointmentForm';
import { sample_base_availability } from '@/utility/sample_data/sample_base_availability';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { GET_USER_AVAILABILITY } from '@/utility/queries/availabilityQueries';

interface WeekDaysProps {
  userId: string,
}

export const WeekDays: React.FC<WeekDaysProps> = ({userId}) => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const [rangeStart, rangeEnd] = useMemo(() => getISOMonthRange(), []);
  const [formOpen, setFormOpen] = useState<boolean>(false);
  const [editAppointment, setEditAppointment] = useState<AppointmentData>();

  const { data: availability, loading: loadingAvailability } = useQuery(GET_USER_AVAILABILITY, { variables: { userId }});

  const availabilityMap = useMemo(() => {
    if (!availability || loadingAvailability) return;

    const map = new Map<number, AvailabilitySlice[]>([]);
    availability.getUserAvailability.forEach((slice: AvailabilitySlice) => map.set(slice.day, [...(map.get(slice.day) || []), slice]));
    return map;
  }, [availability, loadingAvailability]);

  useEffect(() => {
    if (!editAppointment) return;
    setFormOpen(true);
  }, [editAppointment]);

  useEffect(() => {
    if (formOpen) return;
    setEditAppointment(undefined);
  }, [formOpen]);
  
  const { data, loading, error } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userId,
      rangeStart,
      rangeEnd,
    }
  });

  useEffect(() => {
    if (loading) return;
    if (error) return console.error(error.message);

    setAppointments(data.getUserAppointments);
  }, [data, error, loading]);

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
          const thisDayApps = appointments.filter((app) => inRange(getISODayRange(date), app.start_date));

          return <Hours key={i} day={i} availability={availabilityMap?.get(i) || []} appointments={thisDayApps} setEditAppointment={setEditAppointment} />
        })}
      </div>

      {editAppointment && <AppointmentForm onSubmit={() => setEditAppointment(undefined)} userId={userId} open={formOpen} setOpen={setFormOpen} initialAppointment={editAppointment} />}
    </div>
  )
}
