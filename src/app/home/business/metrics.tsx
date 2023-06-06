'use client';


import { ReactIconButton } from "@/components/UI/IconButton/ReactIconButton";
import { AppointmentMetrics } from "@/types/Appointment";
import { Client } from "@/types/Client";
import { User } from "@/types/User";
import { getISOYearRange } from "@/utility/functions/dateRanges/getISOYearRange";
import { GET_BUSINESS_APPOINTMENT_METRICS } from "@/utility/queries/businessQueries";
import { useQuery } from "@apollo/client";
import clsx from "clsx";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import styles from './business.module.scss';

interface MetricsProps {
  user: User,
  clients: Client[],
  businessId: string,
}

export const Metrics: React.FC<MetricsProps> = ({user, clients, businessId}) => {
  const today = new Date();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());  
  const [startDate, endDate] = useMemo(() => getISOYearRange(selectedDate), [selectedDate]);

  const [appMetrics, setAppMetrics] = useState<AppointmentMetrics[]>([]);

  const { data: metricsData } = useQuery(GET_BUSINESS_APPOINTMENT_METRICS, { variables: { businessId, startDate, endDate }})

  useEffect(() => {
    if (!metricsData) return;
    setAppMetrics(metricsData.getBusinessAppointmentMetrics);
  }, [metricsData]);

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


  const clientsInRange = useMemo<Client[]>(() => clients
    .filter(c => new Date(c.joined_date).getFullYear() === selectedDate.getFullYear())
  , [clients, selectedDate]);

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

      <div className={styles.metric_data}>
        <div style={{textAlign: 'center'}}>
          <p className={styles.metric}>
            ${appMetrics.filter(app => app.is_paid).map(app => app.service_cost).reduce((a, b) => a + b, 0).toFixed(2)}
          </p>
          <p className={styles.metric_label}>
            Total Paid
          </p>
          <p className={styles.metric}>
            ${appMetrics.filter(app => !app.is_paid).map(app => app.service_cost).reduce((a, b) => a + b, 0).toFixed(2)}
          </p>
          <p className={styles.metric_label}>
            Total Unpaid
          </p>
          <p className={styles.metric}>
            {appMetrics.length}
          </p>
          <p className={styles.metric_label}>
            Appointment(s)
          </p>
          <p className={styles.metric}>
            {clientsInRange.length}
          </p>
          <p className={styles.metric_label}>
            Accrued Client(s)
          </p>
        </div>
      </div>      
    </>
  )
}