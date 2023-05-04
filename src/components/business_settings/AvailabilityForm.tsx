import { AvailabilitySlice } from "@/types/BaseAvailability";
import { inRange } from "@/utility/functions/dateRanges/inRange";
import { formatMilitaryTime } from "@/utility/functions/formatting/formatMilitaryTime";
import { formatPeriodToMilitary } from "@/utility/functions/formatting/formatPeriodToMilitary";
import React, { useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { HoursList } from "../SelectLists/Hours";
import { MinutesList } from "../SelectLists/Minutes";
import { PeriodList } from "../SelectLists/Period";
import { Modal } from "../UI/Modal/Modal";
import { Select } from "../UI/Select/Select";
import styles from './tabs.module.scss';

interface AvailabilityFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  slices: AvailabilitySlice[],
  day: string,
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({open, onClose, slices, day}) => {

  const [addSlices, setAddSlices] = useState<AvailabilitySlice[]>([]);

  const [startHrs, setStartHrs] = useState<number>();
  const [startMin, setStartMin] = useState<number>();
  const [startPeriod, setStartPeriod] = useState<'am' | 'pm'>('am');

  const [endHrs, setEndHrs] = useState<number>();
  const [endMin, setEndMin] = useState<number>();
  const [endPeriod, setEndPeriod] = useState<'am' | 'pm'>('am');

  const startString = useMemo(() => {
    if (!startHrs || startMin === undefined) return;
    return formatPeriodToMilitary(startHrs, startMin, startPeriod);
  }, [startHrs, startMin, startPeriod]);
  const startValue = useMemo(() => {
    if (!startString) return;
    return Number(startString.split(':').join(''));
  },[startString]);
  
  const endString = useMemo(() => {
    if (!endHrs || endMin === undefined) return;
    return formatPeriodToMilitary(endHrs, endMin, endPeriod);
  }, [endHrs, endMin, endPeriod]);
  const endValue = useMemo(() => {
    if (!endString) return;
    return Number(endString.split(':').join(''));
  },[endString]);

  const overlapping = useMemo(() => {
    if (!startValue || !endValue) return;

    return [...slices, ...addSlices].some(({start_time, end_time}) => {
      const sliceStart = Number(start_time.split(':').join(''));
      const sliceEnd = Number(end_time.split(':').join(''));

      return inRange([startValue, endValue], sliceStart) || inRange([startValue, endValue], sliceEnd);
    })
  }, [addSlices, endValue, slices, startValue]);


  const sortedSlices = useMemo(() => 
    [...slices, ...addSlices]
    .sort((a, b) => 
      Number(a.start_time.split(':').join('')) - Number(b.start_time.split(':').join('')))
  , [addSlices, slices]);


  return (
    <Modal
      open={open}
      onClose={onClose}
      actionButtonText="Save"
    >
      <Modal.Header>Set Availability</Modal.Header>
        <div className={styles.availabilityForm}>
          <p>Booking Hours for {day}</p>
          {sortedSlices.map(slice => (
            <div key={slice.start_time} className={styles.formSlice}>
              <p>{formatMilitaryTime(slice.start_time)} - {formatMilitaryTime(slice.end_time)}</p>
            </div>
          ))}
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
            <div className={styles.addSlice}>
              <AiOutlinePlus fontSize={11} style={{marginRight: 12}} />
              <p>Add period</p>
            </div>
          </div>
          
        </div>
    </Modal>
  )
}