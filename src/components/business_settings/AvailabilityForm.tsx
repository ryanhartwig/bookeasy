import { AvailabilitySlice } from "@/types/BaseAvailability";
import { formatMilitaryTime } from "@/utility/functions/formatting/formatMilitaryTime";
import React, { useMemo, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { Modal } from "../UI/Modal/Modal";
import styles from './tabs.module.scss';

interface AvailabilityFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  slices: AvailabilitySlice[],
  day: string,
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({open, onClose, slices, day}) => {

  const [addSlices, setAddSlices] = useState<AvailabilitySlice[]>([]);

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
          <div className={styles.addSlice}>
            <AiOutlinePlus fontSize={13}/>
          </div>
        </div>
    </Modal>
  )
}