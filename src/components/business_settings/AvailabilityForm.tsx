import { AvailabilitySlice } from "@/types/BaseAvailability";
import React, { useState } from "react";
import { Modal } from "../UI/Modal/Modal";
import styles from './tabs.module.scss';

interface AvailabilityFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  slices: AvailabilitySlice[],
}

export const AvailabilityForm: React.FC<AvailabilityFormProps> = ({open, onClose, slices}) => {

  const [addSlices, setAddSlices] = useState<AvailabilitySlice[]>([]);

  

  return (
    <Modal
      open={open}
      onClose={onClose}
      actionButtonText="Save"

    >
      <Modal.Header>Set Booking Hours</Modal.Header>
        <div className={styles.availabilityForm}>
          <p>test</p>
        </div>
    </Modal>
  )
}