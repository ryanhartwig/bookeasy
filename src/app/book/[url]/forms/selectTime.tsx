import './calendar.css';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import styles from './forms.module.scss';
import { NewBusiness } from '@/types/Business';
import { Staff } from '@/types/User';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { GET_STAFF_AVAILABILITY } from '@/utility/queries/availabilityQueries';
import { useQuery } from '@apollo/client';
import { AppointmentDates } from '@/types/Appointment';
import { GET_STAFF_APPOINTMENTS_DATES, GET_USER_APPOINTMENTS_DATES } from '@/utility/queries/appointmentQueries';
import { Service } from '@/types/Service';
import { timeSliceToNumeric } from '@/utility/functions/conversions/timeSliceToNumeric';
import { numericToTimeSlice } from '@/utility/functions/conversions/numericToTimeSlice';

interface SelectTimeProps {
  business: NewBusiness,
  selectedStaff: Staff,
  selectedService: Service,
}

const getStartDay = (d: Date | string | number) => {
  const date = new Date(d);
  date.setHours(0,0,0,0);
  return date;
}
const getStartMonth = (d: Date | string | number = new Date()) => {
  const date = new Date(d);
  date.setHours(0,0,0,0);
  date.setDate(1);
  return date;
}
const addMsToDate = (ms: number | string, date: Date = new Date()) => {
  const d = new Date(date);
  d.setTime(d.getTime() + Number(ms));
  return d;
}

export const SelectTime: React.FC<SelectTimeProps> = ({business, selectedStaff, selectedService}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [baseAvailability, setBaseAvailability] = useState<Map<number, [string, string][]>>(new Map());
  const [viewingMonthStart, setViewingMonthStart] = useState<Date>(getStartMonth());
  const [appointmentsMap, setAppointmentsMap] = useState<Map<string, AppointmentDates[]>>();
  const [timeSlotsMap, setTimeSlotsMap] = useState<Map<string, string[]>>(new Map());

  const minDate = useMemo(() => addMsToDate(business.min_booking_notice ?? 0), [business.min_booking_notice]);
  const maxDate = useMemo(() => business.max_book_ahead ? addMsToDate(business.max_book_ahead) : undefined, [business.max_book_ahead]);
  
  // Set current month range
  const [monthStart, monthEnd] = useMemo(() => {
    if (!viewingMonthStart) return [null, null];
    const end = new Date(viewingMonthStart);
    end.setMonth(end.getMonth() + 1);
    end.setDate(end.getDate() - 1);
    end.setHours(23, 59, 59, 999);

    return [viewingMonthStart, end];
  }, [viewingMonthStart]);

  // Populate appointmentsMap with the day start as the key, and all appointments for that day as the value
  const setAppointments = useCallback((apps: AppointmentDates[]) => {
    const map = new Map<string, AppointmentDates[]>();
    const sorted = [...apps].sort((a, b) => a.start_date < b.start_date ? -1 : 1);

    for (let leftIndex = 0; leftIndex < sorted.length; leftIndex++) {
      const {start_date, end_date} = sorted[leftIndex];
      const leftStartDay = getStartDay(start_date).toISOString();
      const currentDayApps: AppointmentDates[] = [{start_date, end_date}]; 
      let rightIndex = leftIndex + 1;

      while(rightIndex < sorted.length) {
        const {start_date, end_date} = sorted[rightIndex];
        const currentStartDay = getStartDay(start_date).toISOString();
        if (leftStartDay !== currentStartDay) break;
        currentDayApps.push({start_date, end_date});
        rightIndex++;
      }
      leftIndex = rightIndex - 1; // Left is about to be auto incremented, so we subtract 1
      map.set(leftStartDay, currentDayApps);
    }
    
    setAppointmentsMap(map);
  } ,[]);

  // use appropriate fetch (user or staff) depending on if the staff is registered 
  const { data: staffAppointmentData, loading: loadingStaffAppointmentData } = useQuery(GET_STAFF_APPOINTMENTS_DATES, { variables: {
    staffId: selectedStaff.id,
    rangeStart: monthStart?.toISOString(),
    rangeEnd: monthEnd?.toISOString(),
  }, skip: !!selectedStaff.registered_user_id || !monthStart || !monthEnd});
  useEffect(() => staffAppointmentData && setAppointments(staffAppointmentData.getStaffAppointments), [setAppointments, staffAppointmentData]);
  const { data: userAppointmentData, loading: loadingUserAppointmentData } = useQuery(GET_USER_APPOINTMENTS_DATES, { variables: {
    registeredUserId: selectedStaff.registered_user_id,
    rangeStart: monthStart?.toISOString(),
    rangeEnd: monthEnd?.toISOString(),
  }, skip: !selectedStaff.registered_user_id || !monthStart || !monthEnd});
  useEffect(() => userAppointmentData && setAppointments(userAppointmentData.getUserAppointments), [setAppointments, userAppointmentData]);
  
  // Populate timeSlices map with the day start as key, and all available booking slots as value
  useEffect(() => {
    if (!appointmentsMap) return;
    if (!monthStart || !monthEnd || !minDate) return;
    const timeSlices = new Map<string, string[]>();

    let currentDateKey = getStartDay(monthStart);
    let endDateKey = getStartDay(monthEnd);

    // Clamp start and end dates respectively based on business min & max booking dates
    if (currentDateKey.toISOString() === getStartMonth(minDate).toISOString()) {
      currentDateKey = getStartDay(minDate);
    }
    if (maxDate && getStartMonth(endDateKey).toISOString() === getStartMonth(maxDate).toISOString()) {
      endDateKey = getStartDay(maxDate);
    }

    // For each day of the month (or clamped month)
    while (currentDateKey.toISOString() <= endDateKey.toISOString()) {
      const startTimes: string[] = [];
      const currentDayAvailability = baseAvailability.get((currentDateKey.getDay() - 1) % 7);
      if (!currentDayAvailability) { 
        currentDateKey.setDate(currentDateKey.getDate() + 1);
        continue;
      }
      const currentDayAppointments = appointmentsMap.get(currentDateKey.toISOString()) ?? [];

      // Traverse backwards from end of each availability period to start, 15 minutes at a time
      for (let i = currentDayAvailability.length - 1; i >= 0; i--) {
        const [start, end] = currentDayAvailability[i].map(str => timeSliceToNumeric(str));
        let accumulativeDuration = 0;
        let working = end;

        while (working >= start) {
          const [hr, min] = numericToTimeSlice(working).split(':');
          const currentTime = new Date(currentDateKey);
          currentTime.setHours(Number(hr), Number(min));
          const current = currentTime.toISOString();

          // Inclusive start & exclusive end required for back to back booking
          if (currentDayAppointments.some(({start_date: s, end_date: e}) => s <= current && e > current)) {
            accumulativeDuration = 0; // reset when appointment exists in current 15m block
          }

          // If current day contains min or max dates, trim availability to appropriate 15m block
          if (currentDateKey.toISOString() === getStartDay(minDate).toISOString()) {
            let [minHr, minMin] = minDate.toTimeString().split(':').map(str => Number(str));
            minMin = Math.floor(minMin / 15) * 15;
            
            if ((Number(hr) === minHr ? Number(min) < minMin : Number(hr) < minHr)) {
              break; // Since we are descending, we can stop the while loop entirely
            }
          }
          if (maxDate && currentDateKey.toISOString() === getStartDay(maxDate).toISOString()) {
            let [maxHr, maxMin] = maxDate.toTimeString().split(':').map(str => Number(str));
            maxMin = Math.floor(maxMin / 15) * 15;

            if ((Number(hr) === maxHr ? Number(min) > maxMin : Number(hr) > maxHr)) {
              accumulativeDuration += 15;
              working -= 25;
              continue; 
            }
          }
          
          if (accumulativeDuration >= selectedService.duration) {
            const formattedTime = `${hr}:${min}`;
            startTimes.unshift(formattedTime);
          }

          accumulativeDuration += 15;
          working -= 25;
        }
      }

      timeSlices.set(currentDateKey.toISOString(), startTimes);
      currentDateKey.setDate(currentDateKey.getDate() + 1);
    }

    setTimeSlotsMap(timeSlices);
  }, [appointmentsMap, baseAvailability, maxDate, minDate, monthEnd, monthStart, selectedService.duration]);

  // Set base / recurring availability
  const { data: availabilityData, loading: loadingAvailabilityData } = useQuery(GET_STAFF_AVAILABILITY, { variables: { staffId: selectedStaff.id }});
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
        className={styles.calendar}
        // tileContent={({date}) => {return <p>{timeSlicesMap.get(getStartDay(date).toISOString())?.length}</p>}}
        tileDisabled={({date}) => !timeSlotsMap.has(getStartDay(date).toISOString())}
        showNeighboringMonth={false}
        minDate={minDate} 
        maxDate={maxDate}
        prev2Label={null}
        next2Label={null}
        maxDetail={'month'}
        minDetail={'month'}
        onChange={(value, e) => { setSelectedDate(new Date(value as Date))}} 
        // On navigate / month change
        onActiveStartDateChange={({activeStartDate}) => {setViewingMonthStart(activeStartDate!)}}
        value={selectedDate} 
      />}
      <div className={styles.timeSlots}>
        {(timeSlotsMap.get('' + selectedDate?.toISOString()) ?? []).map(slot => {
          // Format to 12hr time
          let period = 'am';
          let [hr, min] = slot.split(':');
          if (Number(hr) > 12) { 
            hr = (Number(hr) - 12).toString();
            period = 'pm';
          }

          return (
            <div key={slot} className={styles.slot}>
              <p>{`${hr}:${min} ${period}`}</p>
            </div>
        )})}
      </div>
    </div>
  )
}