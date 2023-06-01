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
import { GET_STAFF_APPOINTMENTS } from '@/utility/queries/appointmentQueries';

interface SelectTimeProps {
  business: NewBusiness,
  selectedStaff: Staff | null,
}

export const SelectTime: React.FC<SelectTimeProps> = ({business, selectedStaff}) => {
  const minDate = useMemo(() => {
    const date = new Date();
    date.setTime(date.getTime() + Number(business.min_booking_notice ?? 0));
    return date;
  }, [business.min_booking_notice]);
  const maxDate = useMemo(() => {
    if (!business.max_book_ahead) return undefined;
    let date = new Date();
    date.setTime(date.getTime() + Number(business.max_book_ahead));
    return date;
  }, [business.max_book_ahead]);

  const [selectedDate, setSelectedDate] = useState<any>(undefined);

  // Base / recurring availability
  const [baseAvailability, setBaseAvailability] = useState<Map<number, [string, string][]>>(new Map());
  useEffect(() => {
    let dayIndex = minDate.getDay() - 1 % 7;
  }, [minDate]);
  
  
  // Fetch appointments for the current month
  const [appointmentsMap, setAppointmentsMap] = useState<Map<string, Appointment[]>>(new Map());

  // Alllll the month appointments
  const { data: appointmentData, loading: loadingAppointmentData } = useQuery(GET_STAFF_APPOINTMENTS, { variables: {
    staffId: selectedStaff?.id,
    start_date: null,
    end_date: null,
  }, skip: !selectedStaff})

  // For each week of the month
  //  For each day of baseAvailability
  //    Grab appointments from fetch for current day, and determine available booking periods

  


  // Set base / recurring availability
  const { data: availabilityData, loading } = useQuery(GET_STAFF_AVAILABILITY, { variables: { staffId: selectedStaff?.id }, skip: !selectedStaff});
  useEffect(() => {
    if (!availabilityData || loading) return;
    const map = new Map<number, [string, string][]>();
    (availabilityData.getStaffAvailability as AvailabilitySlice[]).forEach(({day, start_time, end_time}) => map.set(day, [...(map.get(day) ?? []), [start_time, end_time]]))
    setBaseAvailability(map);
  }, [availabilityData, loading]); 

  return (
    <div className={styles.selectTime}>
      <Calendar 
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
        value={selectedDate} 
      />
    </div>
  )
}