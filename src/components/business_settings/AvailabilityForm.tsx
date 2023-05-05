import { AvailabilitySlice } from "@/types/BaseAvailability";
import { inRange } from "@/utility/functions/dateRanges/inRange";
import { formatMilitaryTime } from "@/utility/functions/formatting/formatMilitaryTime";
import { formatPeriodToMilitary } from "@/utility/functions/formatting/formatPeriodToMilitary";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { BsTrash3 } from "react-icons/bs";
import { HoursList } from "../SelectLists/Hours";
import { MinutesList } from "../SelectLists/Minutes";
import { PeriodList } from "../SelectLists/Period";
import { Modal } from "../UI/Modal/Modal";
import { Select } from "../UI/Select/Select";
import styles from './tabs.module.scss';

import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import clsx from "clsx";
import { weekDays } from "@/utility/data/days";
import { useMutation } from "@apollo/client";
import { SET_USER_AVAILABILITY } from "@/utility/queries/userQueries";
import { GET_USER_AVAILABILITY } from "@/utility/queries/availabilityQueries";


interface AvailabilityFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  slices: AvailabilitySlice[],
  businessId: string,
  day: number,
  userId?: string,
}

const convertTotalTime = (total: number) => {
  let [hr, x, y, z] = total.toString().split('');
  if (z) {
    hr = `${hr}${x}`;
    [x, y] = [y, z];
  }
  const min = Number(x + y);

  return [hr, min];
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({open, onClose, userId, slices, businessId, day}) => {
  const [newSlices, setNewSlices] = useState<AvailabilitySlice[]>(slices);

  const sortedSlices = useMemo(() => 
    newSlices
    .sort((a, b) => 
      Number(a.start_time.split(':').join('')) - Number(b.start_time.split(':').join('')))
  , [newSlices]);

  useEffect(() => {
    const merged = sortedSlices.reduce((acc: AvailabilitySlice[], current: AvailabilitySlice, index: number) => {
      const prev = acc[acc.length - 1];

      if (prev && prev.end_time === current.start_time) {
        const merged = {
          ...prev,
          end_time: current.end_time,
        }
        acc[acc.length - 1] = merged;
      } 
      else acc.push(current);
      
      return acc;
    }, [])
    
    if (merged.length !== sortedSlices.length) {
      setNewSlices(merged);
    }
  }, [sortedSlices]);

  const totalTime = useMemo(() => newSlices.reduce((a, b) => a + (Number(b.end_time.split(':').join('')) - Number(b.start_time.split(':').join(''))), 0), [newSlices]);
  // Used for total accumulative booking hours metric
  const [hr, min] = useMemo(() => convertTotalTime(totalTime), [totalTime]);

  const [startHrs, setStartHrs] = useState<number>();
  const [startMin, setStartMin] = useState<number>();
  const [startPeriod, setStartPeriod] = useState<'am' | 'pm'>('am');

  const [endHrs, setEndHrs] = useState<number>();
  const [endMin, setEndMin] = useState<number>();
  const [endPeriod, setEndPeriod] = useState<'am' | 'pm'>('am');

  const [setUserAvailability, { data, loading }] = useMutation(SET_USER_AVAILABILITY, {
    refetchQueries: [{
      query: GET_USER_AVAILABILITY,
      variables: {
        userId,
        businessId,
      }
    }]
  });

  const startString = useMemo(() => {
    if (startHrs === undefined || startMin === undefined) return;
    return formatPeriodToMilitary(startHrs, startMin, startPeriod);
  }, [startHrs, startMin, startPeriod]);
  const startValue = useMemo(() => {
    if (!startString) return;
    return Number(startString.split(':').join(''));
  },[startString]);
  
  const endString = useMemo(() => {
    if (endHrs === undefined || endMin === undefined) return;
    return formatPeriodToMilitary(endHrs, endMin, endPeriod);
  }, [endHrs, endMin, endPeriod]);
  const endValue = useMemo(() => {
    if (!endString) return;
    return Number(endString.split(':').join(''));
  },[endString]);

  const overlapping = useMemo(() => {
    if (startValue === undefined || endValue === undefined) return;

    return newSlices.some(({start_time, end_time}) => {
      const sliceStart = Number(start_time.split(':').join(''));
      const sliceEnd = Number(end_time.split(':').join(''));

      return (inRange([startValue, endValue], sliceStart, false) || inRange([startValue, endValue], sliceEnd, false)
        || inRange([sliceStart, sliceEnd], startValue, false) || inRange([sliceStart, sliceEnd], endValue, false))
      || (sliceStart === startValue && sliceEnd === endValue);
    })
  }, [endValue, newSlices, startValue]);
  const invalidValues = useMemo(() => startValue !== undefined && endValue !== undefined && startValue >= endValue, [endValue, startValue]);
  const canSubmit = useMemo(() => startValue && endValue && !invalidValues && !overlapping, [endValue, invalidValues, overlapping, startValue]);

  const onAddSlice = useCallback(() => {
    if (!canSubmit || !startString || !endString) return;

    const slice: AvailabilitySlice = {
      business_id: businessId,
      day,
      start_time: startString,
      end_time: endString,
    }

    setStartHrs(undefined);
    setStartMin(undefined);
    setStartPeriod('am');
    setEndHrs(undefined);
    setEndMin(undefined);
    setEndPeriod('am');

    setNewSlices(p => [...p, slice]);
  }, [businessId, canSubmit, day, endString, startString]);

  const onSubmit = useCallback(() => {
    setUserAvailability({variables: { userId, businessId, day, slices: newSlices.map(s => ({...s, user_id: userId, __typename: undefined})) }})
  }, [businessId, day, newSlices, setUserAvailability, userId]);

  useEffect(() => {
    if (!data || loading) return;
    onClose();
  }, [data, loading, onClose]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      actionButtonText="Save"
      actionCloses
      onAction={onSubmit}
      loading={loading}
    >
      <Modal.Header>Set Availability</Modal.Header>
        <div className={styles.availabilityForm} >
          <p>Booking hours for {weekDays[day]}</p>
          {/* Must wrap to prevent clickout */}
          {sortedSlices.length ? sortedSlices.map(slice => (
            <div key={slice.start_time} className={styles.formSlice}>
              <p>{formatMilitaryTime(slice.start_time)} - {formatMilitaryTime(slice.end_time)}</p>
              <BsTrash3 className={styles.removeSlice} onClick={() => setTimeout(() => setNewSlices(p => p.filter(sl => sl.start_time !== slice.start_time)), 1)} /> {/* Timeout prevents useClickout race */}
            </div>
          )) : <p style={{fontWeight: 300, fontSize: 14}}>None</p>}
          
          <p style={{fontWeight: 300, fontSize: 14, marginTop: 15}}>Total: {hr ? `${hr}h`:''} {min ? `${min}m`:''}</p>
          <div className={styles.periodSelect}>
            <p>Period Start:</p>
            <div className={styles.timeSelect}>
              <Select list={HoursList(setStartHrs)} selected={<p>{startHrs}</p> } placeholder="hr" hasSelected={!!startHrs} />
              <p>:</p>
              <Select list={MinutesList(setStartMin)} selected={<p>{startMin === 0 ? '00' : startMin}</p>} placeholder="min" hasSelected={startMin !== undefined} />
              <Select list={PeriodList(setStartPeriod)} selected={<p>{startPeriod}</p>} hasSelected />
            </div>
            <p>Period End:</p>
            <div className={styles.timeSelect}>
              <Select list={HoursList(setEndHrs)} selected={<p>{endHrs}</p> } placeholder="hr" hasSelected={!!endHrs} />
              <p>:</p>
              <Select list={MinutesList(setEndMin)} selected={<p>{endMin === 0 ? '00' : endMin}</p>} placeholder="min" hasSelected={endMin !== undefined} />
              <Select list={PeriodList(setEndPeriod)} selected={<p>{endPeriod}</p>} hasSelected />
            </div>
            <div className={clsx(styles.addSlice, {[styles.valid]: canSubmit})} onClick={onAddSlice}>
              {canSubmit
                ? <IoMdCheckmark />
                : <RxCross2 />
              }
              <p>Add period</p>
            </div>
            {overlapping && <p className={styles.warning}>* booking periods can not overlap</p>}
            {invalidValues && <p className={styles.warning}>* starting period must be less then ending period</p>}
          </div>
        </div>
    </Modal>
  )
}