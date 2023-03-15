'use client';

import { ReactIconButton } from "@/components/UI/ReactIconButton";
import { User } from "@/types/User";
import { useCallback, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from './business.module.scss';

interface MetricsProps {
  user: User,
}

export const Metrics: React.FC<MetricsProps> = ({user}) => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());  

  const onYearChange = useCallback((n: number) => {
    setSelectedDate(p => {
      const date = new Date(p);

      date.setFullYear(date.getFullYear() + n);
      return date;
    });
  }, []);
  

  return (
    <>
      <div className={styles.year_select}>
        <ReactIconButton buttonSize='30px' onClick={() => onYearChange(-1)} style={{borderRadius: '12px'}}>
          <AiOutlineLeft size={15}/>
        </ReactIconButton> 
        <h2>{selectedDate.getFullYear()}</h2>

        <ReactIconButton buttonSize='30px' onClick={() => onYearChange(1)} style={{borderRadius: '12px'}}>
          <AiOutlineRight size={15}/>
        </ReactIconButton>
      </div>
    </>
  )
}