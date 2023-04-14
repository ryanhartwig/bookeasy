import { Avatar } from "@/components/UI/Avatar/Avatar"
import { Modal } from "@/components/UI/Modal/Modal"
import { Select } from "@/components/UI/Select/Select"
import { Appointment } from "@/types/Appointment"
import { Business } from "@/types/Business"
import { Client } from "@/types/Client"
import { Service } from "@/types/Service"
import { userId } from "@/utility/sample_data/sample_userId"
import clsx from "clsx"
import { useEffect, useMemo, useState } from "react"
import { AppointmentActionCard } from "../appointmentActionCard"

import { BsFillCameraVideoFill } from 'react-icons/bs';


import styles from './appointmentForm.module.scss';
import { useWaterfall } from "@/utility/hooks/useWaterfall"
import { formatFullDateString } from "@/utility/functions/formatting/formatFullDateString"
import { AvailabilitySlice, BaseAvailability } from "@/types/BaseAvailability"
import { getUserAvailability } from "@/utility/functions/fetch/getUserAvailability"

interface AppointmentFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  businesses: Business[],
  clients: Client[],
  services: Service[],
  availability: BaseAvailability[],
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({open, setOpen, businesses, clients, services}) => {
  
  const [selectedBusiness, setSelectedBusiness] = useState<Business>();
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedService, setSelectedService] = useState<Service>();
  const [date, setDate] = useState<string>();
  const [hours, setHours] = useState<number>();
  const [min, setMin] = useState<number>();
  const [period, setPeriod] = useState<'am' | 'pm'>('am');

  const [availabilitySlices, setAvailabilitySlices] = useState<AvailabilitySlice[]>();
  const [availabilityMap, setAvailabilityMap] = useState<Map<string, BaseAvailability>>(new Map());


  

  const startEndDates = useMemo(() => {
    if (!date || !hours || min === undefined || !period || !selectedService) return [0, 0];

    const dateObj = new Date();
    const [year, month, day] = date.split('-').map(d => Number(d));
    dateObj.setFullYear(year);
    dateObj.setMonth(month - 1); // 0 indexed
    dateObj.setDate(day);
    console.log(min);
    dateObj.setHours(hours + (period === 'pm' ? 12 : 0), min, 0, 0);

    const start = dateObj.getTime();
    dateObj.setTime(dateObj.getTime() + 1000 * 60 * selectedService.duration);
    const end = dateObj.getTime();

    return [start,end];
  }, [date, hours, min, period, selectedService]);



  useWaterfall([
    [[selectedBusiness, setSelectedBusiness]], // first waterfall chunk
    [[selectedClient, setSelectedClient], [selectedService, setSelectedService]], // second chunk, resets when first updates
  ]);

  const [appointment, setAppointment] = useState<Appointment>({
    businessId: selectedBusiness?.id ?? '',
    clientId: selectedClient?.id ?? "",
    endDate: 0,
    id: "",
    isPaid: false,
    isVideo: false,
    serviceCost: 0,
    serviceDuration: 0,
    serviceId: "",
    serviceName: "...",
    serviceProvider: "...",
    startDate: 0,
    userId: userId,
  });

  const businessesList = useMemo(() => businesses.map(b => (
    <div key={b.id} className={styles.option} onClick={() => {setSelectedBusiness(b)}}>
      <p>{b.name}</p>
    </div>
  )), [businesses]);
  const businessElement = useMemo(() => selectedBusiness ? (
    <div className={styles.selectedOption}>
      <p>{selectedBusiness.name}</p>
    </div>
  ) : undefined, [selectedBusiness]);

  const clientsList = useMemo(() => selectedBusiness 
    ? clients
        .filter(c => c.businessId === selectedBusiness.id) 
        .map(c => (
          <div key={c.id} className={styles.option} onClick={() => setSelectedClient(c)}>
            <Avatar src={c.avatar} size={28} />
            <p>{c.name}</p>
          </div>
        ))
    : []
  , [clients, selectedBusiness]);
  const clientElement = useMemo(() => selectedClient ? (
    <div className={styles.selectedOption}>
      <Avatar src={selectedClient.avatar} size={28} />
      <p>{selectedClient.name}</p>
    </div>
  ) : undefined, [selectedClient]);

  const servicesList = useMemo(() => selectedBusiness
    ? services
      .filter(s => s.businessId === selectedBusiness.id)
      .map(s => (
        <div key={s.id} style={{borderLeftColor: s.color}} className={clsx(styles.option, styles.service)} onClick={() => setSelectedService(s)}>
          {s.isVideo && <BsFillCameraVideoFill size={16} color={'grey'} />}
          <p>{s.name}</p>
        </div>
      ))
    : []
  , [selectedBusiness, services]);
  const serviceElement = useMemo(() => selectedService 
    ? <div className={styles.selectedOption}>
        {selectedService.isVideo && <BsFillCameraVideoFill size={16} color={'grey'} />}
        <p>{selectedService.name}</p>
      </div>
    : undefined
  , [selectedService]);

  const hoursList = new Array(12).fill(0).map((_, i) => (
    <div key={i} className={styles.option} onClick={() => setHours(i + 1)}>
      <p>{i + 1}</p>
    </div>
  ));

  const minList = new Array(4).fill(0).map((_, i) => (
    <div key={i} className={styles.option} onClick={() => setMin(i * 15)}>
      <p>{i * 15}</p>
    </div>
  ));

  const periodList = new Array(2).fill(0).map((_, i) => (
    <div key={i} className={styles.option} onClick={() => setPeriod(!i ? 'am' : 'pm')}>
      <p>{!i ? 'am' : 'pm'}</p>
    </div>
  ));

  return (
    <Modal actionButtonText='Confirm' open={open} onClose={() => setOpen(false)} className={styles.appointmentForm}>
      <Modal.Header>Create an Appointment</Modal.Header>
      <div className={styles.appointmentOptions}>
        <p>Select a provider</p>
        <Select list={businessesList} selected={businessElement} placeholder="..." />
        <p>Select a client</p>
        <Select list={clientsList} selected={clientElement} placeholder="..." />
        <p>Select a service</p>
        <Select list={servicesList} selected={serviceElement} placeholder="..." />
        <p>Select date and time</p>
        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className={styles.dateInput} />
        <div className={styles.timeSelect}>
          <Select list={hoursList} selected={hours ? <p>{hours}</p> : undefined} placeholder="hr" />
          <p>:</p>
          <Select list={minList} selected={min !== undefined ? <p>{min === 0 ? '00' : min}</p> : undefined} placeholder="min" />
          <Select list={periodList} selected={<p>{period}</p>} />
        </div>
      </div>
      <hr />
      <p className={styles.appointmentDate}>{startEndDates ? formatFullDateString(startEndDates[0]) : '...'}</p>        
      <AppointmentActionCard 
        app={appointment} 
        service={selectedService ?? {color: 'blue', name: '...', duration: 0} as Service} 
        client={selectedClient ?? {name: '...'} as Client}
        mini
      />
      <p className={styles.warning}>* warning: this appointment falls out of booking hours</p>
    </Modal>
  )
}