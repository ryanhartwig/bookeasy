import { useEffect, useMemo, useState } from 'react';
import Calendar from 'react-calendar';
import styles from './forms.module.scss';
import './calendar.css';
import { NewBusiness } from '@/types/Business';
import { Staff } from '@/types/User';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { GET_STAFF_AVAILABILITY } from '@/utility/queries/availabilityQueries';
import { useQuery } from '@apollo/client';

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

  const [dayAvailability, setDayAvailability] = useState<Map<number, [string, string][]>>(new Map());

  const [value, onChange] = useState<any>(undefined);
  const [slices, setSlices] = useState<AvailabilitySlice[]>([]);
  const { data: availabilityData, loading } = useQuery(GET_STAFF_AVAILABILITY, { variables: { staffId: selectedStaff?.id }, skip: !selectedStaff});
  useEffect(() => availabilityData && !loading && setSlices(availabilityData.getStaffAvailability)
  , [availabilityData, loading]); 

  useEffect(() => {
    const map = new Map<number, [string, string][]>();
    slices.forEach(({day, start_time, end_time}) => map.set(day, [...(map.get(day) ?? []), [start_time, end_time]]));
    setDayAvailability(map);
  }, [slices]);

  // const onClickDay = useCallback(() => {}, []);

  return (
    <div className={styles.selectTime}>
      <Calendar 
        // tileContent={({date}) => {return <p>Y</p>}}
        tileDisabled={({activeStartDate, date}) => {
          const monIndexedDay = date.getDay() === 0 ? 6 : date.getDay() - 1;
          return !dayAvailability.has(monIndexedDay);
        }}
        // showFixedNumberOfWeeks
        showNeighboringMonth={false}
        minDate={minDate} 
        maxDate={maxDate}
        prev2Label={null}
        next2Label={null}
        maxDetail={'month'}
        minDetail={'month'}
        onChange={(value, e) => { onChange(new Date(value as Date))}} 
        value={value} 
      />
    </div>
  )
}