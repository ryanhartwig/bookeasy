import { AvailabilitySlice } from "@/types/BaseAvailability";
import { inRange } from "@/utility/functions/dateRanges/inRange";
import { formatMilitaryTime } from "@/utility/functions/formatting/formatMilitaryTime";
import { formatPeriodToMilitary } from "@/utility/functions/formatting/formatPeriodToMilitary";
import React, { useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { BsTrash3 } from "react-icons/bs";
import { HoursList } from "../SelectLists/Hours";
import { MinutesList } from "../SelectLists/Minutes";
import { PeriodList } from "../SelectLists/Period";
import { Modal } from "../UI/Modal/Modal";
import { Select } from "../UI/Select/Select";
import styles from './tabs.module.scss';

import { IoAddCircle } from 'react-icons/io5';
import { IoMdCheckmark } from 'react-icons/io';
import { RxCross2 } from 'react-icons/rx';
import clsx from "clsx";


interface AvailabilityFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  slices: AvailabilitySlice[],
  day: string,
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({open, onClose, slices, day}) => {

  const [newSlices, setNewSlices] = useState<AvailabilitySlice[]>(slices);

  // const totalTime = useMemo(() => newSlices.reduce((a, b) => a + (Number(b.end_time.split(':').join('')) - Number(b.start_time.split(':').join(''))), 0), [newSlices]);
  // const [hr, x, y] = totalTime.toString().split('');
  // const min = Number(x + y) / 60;

  const [startHrs, setStartHrs] = useState<number>(5);
  const [startMin, setStartMin] = useState<number>(0);
  const [startPeriod, setStartPeriod] = useState<'am' | 'pm'>('am');

  const [endHrs, setEndHrs] = useState<number>(6);
  const [endMin, setEndMin] = useState<number>(0);
  const [endPeriod, setEndPeriod] = useState<'am' | 'pm'>('am');

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

  const sortedSlices = useMemo(() => 
    newSlices
    .sort((a, b) => 
      Number(a.start_time.split(':').join('')) - Number(b.start_time.split(':').join('')))
  , [newSlices]);

  return (
    <Modal
      open={open}
      onClose={onClose}
      actionButtonText="Save"
    >
      <Modal.Header>Set Availability</Modal.Header>
        <div className={styles.availabilityForm}>
          <p>Booking Hours for {day}</p>
          {sortedSlices.length ? sortedSlices.map(slice => (
            <div key={slice.start_time} className={styles.formSlice}>
              <p>{formatMilitaryTime(slice.start_time)} - {formatMilitaryTime(slice.end_time)}</p>
              <BsTrash3 className={styles.removeSlice} onClick={() => setNewSlices(p => p.filter(sl => sl.start_time !== slice.start_time))} />
            </div>
          )) : <p style={{fontWeight: 300, fontSize: 14}}>None</p>}
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
            <div className={clsx(styles.addSlice, {[styles.valid]: canSubmit})}>
              {/* <AiOutlinePlus fontSize={11} style={{marginRight: 12}} /> */}
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