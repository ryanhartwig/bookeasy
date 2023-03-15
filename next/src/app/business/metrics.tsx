'use client';

import { ReactIconButton } from "@/components/UI/ReactIconButton";
import { Appointment } from "@/types/Appointment";
import { Client } from "@/types/Client";
import { User } from "@/types/User";
import { sample_appointments } from "@/utility/sample_data/sample_appointments";
import { sample_clients } from "@/utility/sample_data/sample_clients";
import clsx from "clsx";
import { useCallback, useMemo, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from './business.module.scss';

interface MetricsProps {
  user: User,
}

export const Metrics: React.FC<MetricsProps> = ({user}) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());  

  const onYearChange = useCallback((n: number) => {
    setSelectedDate(p => {
      const date = new Date(p);

      date.setFullYear(date.getFullYear() + n);
      return date;
    });
  }, []);

  const year_joined = useMemo<number>(() => {
    const date = new Date(user.created);
    return date.getFullYear();
  }, [user.created]);

  const appsInRange = useMemo<Appointment[]>(() => sample_appointments
    .filter(app => new Date(app.start_date).getFullYear() === selectedDate.getFullYear())
  , [selectedDate]);
  const clientsInRange = useMemo<Client[]>(() => sample_clients
    .filter(c => new Date(c.created).getFullYear() === selectedDate.getFullYear() && c.business_id === user.own_business_id)
  , [selectedDate, user.own_business_id]);

  return (
    <>
      <div className={styles.year_select}>
        <ReactIconButton 
          className={clsx({[styles.disabled]: year_joined === selectedDate.getFullYear()})} 
          buttonSize='30px' 
          active={false}
          onClick={() => onYearChange(-1)} 
          style={{borderRadius: '12px'}}
        >
          <AiOutlineLeft size={15}/>
        </ReactIconButton>
        <h2>{selectedDate.getFullYear()}</h2>
        <ReactIconButton 
          className={clsx({[styles.disabled]: selectedDate.getFullYear() === today.getFullYear()})}
          buttonSize='30px' 
          onClick={() => onYearChange(1)} 
          style={{borderRadius: '12px'}}
        >
          <AiOutlineRight size={15}/>
        </ReactIconButton>
      </div>

      <hr />
      <p className={styles.metric}>
        ${appsInRange.filter(app => app.is_paid).map(app => app.service_cost).reduce((a, b) => a + b, 0).toFixed(2)}
      </p>
      <p className={styles.metric_label}>
        Total Estimated Revenue
      </p>
      <p className={styles.metric}>
        ${appsInRange.filter(app => !app.is_paid).map(app => app.service_cost).reduce((a, b) => a + b, 0).toFixed(2)}
      </p>
      <p className={styles.metric_label}>
        Total Unpaid
      </p>
      <p className={styles.metric}>
        {appsInRange.length}
      </p>
      <p className={styles.metric_label}>
        Appointments
      </p>
      <p className={styles.metric}>
        {clientsInRange.length}
      </p>
      <p className={styles.metric_label}>
        Accrued Clients
      </p>
    </>
  )
}