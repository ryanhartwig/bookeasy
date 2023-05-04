import { formatPrefPeriod } from "@/utility/functions/formatting/formatPrefPeriod";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { Modal } from "../UI/Modal/Modal";
import styles from './tabs.module.scss';

interface PeriodSelectFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  initialValue: number,
}

export const PeriodSelectForm: React.FC<PeriodSelectFormProps> = ({open, onClose, initialValue}) => {

  const [months, setMonths] = useState<number>(0);
  const [weeks, setWeeks] = useState<number>(0);
  const [days, setDays] = useState<number>(0);
  const [hours, setHours] = useState<number>(0);

  // Initialize each period's value / count
  useEffect(() => {
    const { months, weeks, days, hours } = formatPrefPeriod(initialValue);
    setMonths(months);
    setWeeks(weeks);
    setDays(days);
    setHours(hours);    
  }, [initialValue]);

  return (
    <Modal open={open} onClose={onClose} >
      <Modal.Header>Select Time Period</Modal.Header>
      <div className={styles.periodSelect}>
        <p>Months</p>
        <div className={styles.durationSelect}>
          <AiOutlineMinusCircle onClick={() => setMonths(p => p === 0 ? p : p - 1)} />
          <p>{months}</p>
          <AiOutlinePlusCircle onClick={() => setMonths(p => p + 1)} />
        </div>

        <p>Weeks</p>
        <div className={styles.durationSelect}>
          <AiOutlineMinusCircle onClick={() => setWeeks(p => p === 0 ? p : p - 1)} />
          <p>{weeks}</p>
          <AiOutlinePlusCircle onClick={() => setWeeks(p => p + 1)} />
        </div>

        <p>Days</p>
        <div className={styles.durationSelect}>
          <AiOutlineMinusCircle onClick={() => setDays(p => p === 0 ? p : p - 1)} />
          <p>{days}</p>
          <AiOutlinePlusCircle onClick={() => setDays(p => p + 1)} />
        </div>

        <p>Hours</p>
        <div className={styles.durationSelect}>
          <AiOutlineMinusCircle onClick={() => setHours(p => p === 0 ? p : p - 1)} />
          <p>{hours}</p>
          <AiOutlinePlusCircle onClick={() => setHours(p => p + 1)} />
        </div>
      </div>
    </Modal>
  )
}