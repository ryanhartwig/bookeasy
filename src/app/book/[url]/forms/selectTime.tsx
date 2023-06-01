import './calendar.css';
import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import styles from './forms.module.scss';
import { NewBusiness } from '@/types/Business';
import { Staff } from '@/types/User';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { GET_STAFF_AVAILABILITY } from '@/utility/queries/availabilityQueries';
import { useQuery } from '@apollo/client';
import { Appointment } from '@/types/Appointment';
import { GET_STAFF_APPOINTMENTS_DATES, GET_USER_APPOINTMENTS, GET_USER_APPOINTMENTS_DATES } from '@/utility/queries/appointmentQueries';

interface SelectTimeProps {
  business: NewBusiness,
  selectedStaff: Staff | null,
}

export const SelectTime: React.FC<SelectTimeProps> = ({business, selectedStaff}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  // Base / recurring availability
  const [baseAvailability, setBaseAvailability] = useState<Map<number, [string, string][]>>(new Map());

  const minDate = useMemo(() => {
    if (!baseAvailability) return;
    const date = new Date();
    date.setTime(date.getTime() + Number(business.min_booking_notice ?? 0));
    let dayIndex = date.getDay() - 1 % 7;

    for (let i = 0; i < 7; i++) {
      if (i === 6 && !baseAvailability.has(dayIndex)) return date;
      if (baseAvailability.has(dayIndex)) break;
      dayIndex = (dayIndex + 1) % 7;
      date.setDate(date.getDate() + 1);
    }

    setSelectedDate(date);
    return date;
  }, [baseAvailability, business.min_booking_notice]);
  const maxDate = useMemo(() => {
    if (!business.max_book_ahead) return undefined;
    let date = new Date();
    date.setTime(date.getTime() + Number(business.max_book_ahead));
    return date;
  }, [business.max_book_ahead]);
  
  // Fetch appointments for the current month
  const [currentMonthStart, setCurrentMonthStart] = useState<Date>();

  useEffect(() => {
    if (!minDate) return;
    const date = new Date(minDate);
    date.setDate(1);
    date.setHours(0,0,0,0);
    setCurrentMonthStart(date);
  }, [minDate]);

  // Set current month range
  const [monthStart, monthEnd] = useMemo(() => {
    if (!currentMonthStart) return [null, null];
    const end = new Date(currentMonthStart);
    end.setMonth(end.getMonth() + 1);
    end.setDate(end.getDate() - 1);
    end.setHours(23, 59, 59, 999);

    return [currentMonthStart, end];
  }, [currentMonthStart]);

  const [appointmentsMap, setAppointmentsMap] = useState<Map<string, Appointment[]>>(new Map());

  // use appropriate fetch (user or staff) if the staff is registered 

  const { data: staffAppointmentData, loading: loadingStaffAppointmentData } = useQuery(GET_STAFF_APPOINTMENTS_DATES, { variables: {
    staffId: selectedStaff?.id,
    rangeStart: monthStart?.toISOString(),
    rangeEnd: monthEnd?.toISOString(),
  }, skip: !selectedStaff || !!selectedStaff.registered_user_id || !monthStart || !monthEnd});

  const { data: userAppointmentData, loading: loadingUserAppointmentData } = useQuery(GET_USER_APPOINTMENTS_DATES, { variables: {
    registeredUserId: selectedStaff?.registered_user_id,
    rangeStart: monthStart?.toISOString(),
    rangeEnd: monthEnd?.toISOString(),
  }, skip: !selectedStaff || !selectedStaff.registered_user_id || !monthStart || !monthEnd});


  console.log('user apps: ', userAppointmentData);
  console.log('staff apps: ', staffAppointmentData);

  
  // For each week of the month
  //  For each day of baseAvailability
  //    Grab appointments from fetch for current day, and determine available booking periods

  


  // Set base / recurring availability
  const { data: availabilityData, loading: loadingAvailabilityData } = useQuery(GET_STAFF_AVAILABILITY, { variables: { staffId: selectedStaff?.id }, skip: !selectedStaff});
  useEffect(() => {
    if (loadingAvailabilityData) return;
    if (!availabilityData) {
      setBaseAvailability
    }
    const map = new Map<number, [string, string][]>();
    (availabilityData.getStaffAvailability as AvailabilitySlice[]).forEach(({day, start_time, end_time}) => map.set(day, [...(map.get(day) ?? []), [start_time, end_time]]))
    setBaseAvailability(map);
  }, [availabilityData, loadingAvailabilityData]); 

  return (
    <div className={styles.selectTime}>
      {minDate && <Calendar 
        // tileContent={({date}) => {return <p>Y</p>}}
        tileDisabled={({date}) => {
          const monIndexedDay = date.getDay() - 1 % 7;
          return !baseAvailability.has(monIndexedDay);
        }}
        showNeighboringMonth={false}
        minDate={minDate} 
        maxDate={maxDate}
        prev2Label={null}
        next2Label={null}
        maxDetail={'month'}
        minDetail={'month'}
        onChange={(value, e) => { setSelectedDate(new Date(value as Date))}} 
        // On navigate / month change
        onActiveStartDateChange={({activeStartDate}) => {setCurrentMonthStart(activeStartDate!)}}
        value={selectedDate} 
      />}
    </div>
  )
}