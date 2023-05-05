import styles from './appointmentForm.module.scss';
import clsx from "clsx"
import uuid from "react-uuid"

import { Avatar } from "@/components/UI/Avatar/Avatar"
import { Modal } from "@/components/UI/Modal/Modal"
import { Select } from "@/components/UI/Select/Select"
import { AppointmentData, AppointmentInput } from "@/types/Appointment"
import { FormBusiness, NewBusiness } from "@/types/Business"
import { useCallback, useEffect, useMemo, useState } from "react"
import { AppointmentActionCard } from "../appointmentActionCard"
import { BsFillCameraVideoFill, BsTrash3 } from 'react-icons/bs';
import { useWaterfall } from "@/utility/hooks/useWaterfall"
import { formatFullDateString } from "@/utility/functions/formatting/formatFullDateString"
import { AvailabilitySlice } from "@/types/BaseAvailability"
import { inRange } from "@/utility/functions/dateRanges/inRange"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER_AVAILABILITY } from "@/utility/queries/availabilityQueries"
import { GET_USER_BUSINESSES } from "@/utility/queries/userQueries"
import { GET_BUSINESS_CLIENTS_FORM, GET_BUSINESS_SERVICES_FORM } from "@/utility/queries/businessQueries"
import { ADD_EDIT_APPOINTMENT, DELETE_APPOINTMENT, GET_CLIENT_APPOINTMENTS } from "@/utility/queries/appointmentQueries"
import { Client, FormClient } from '@/types/Client';
import { FormService } from '@/types/Service';
import { gql } from '@apollo/client';
import { NEW_APPOINTMENT_FRAGMENT } from '@/utility/queries/fragments/appointmentFragments';
import { Input } from '@/components/UI/Input/Input';
import { HoursList } from '@/components/SelectLists/Hours';
import { MinutesList } from '@/components/SelectLists/Minutes';
import { PeriodList } from '@/components/SelectLists/Period';

interface ClientBusiness {
  client: Client,
  business: NewBusiness,
}
interface AppointmentFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  userId: string,
  initialAppointment?: AppointmentData,
  initialClientBusiness?: ClientBusiness,
  onSubmit?: (...args: any) => any,
  fromClientForm?: boolean,
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({open, setOpen, userId, initialAppointment, initialClientBusiness, onSubmit, fromClientForm}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<FormBusiness>();
  const [selectedClient, setSelectedClient] = useState<FormClient>();
  const [selectedService, setSelectedService] = useState<FormService>();
  const [date, setDate] = useState<string>();
  const [hours, setHours] = useState<number>();
  const [min, setMin] = useState<number>();
  const [period, setPeriod] = useState<'am' | 'pm'>('am');
  const [error, setError] = useState<string>();
  const [id, setId] = useState<string>();
  const [isPaid, setIsPaid] = useState<boolean>(false);

  const [availability, setAvailability] = useState<AvailabilitySlice[]>([]);
  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);
  const [prepopulating, setPrepopulating] = useState<boolean>(!!initialAppointment);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  useWaterfall([
    [[selectedBusiness, setSelectedBusiness]], // first waterfall chunk
    [[selectedClient, setSelectedClient], [selectedService, setSelectedService]], // second chunk, resets when first updates
  ], undefined, !!initialClientBusiness);

  // Not returning userData
  const { data: availabilityData, loading: loadingAvailability } = useQuery(GET_USER_AVAILABILITY, { variables: { userId }}); 
  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 

  // Depends on selectedBusiness state
  const { data: clientsData, loading: loadingClients } = useQuery(GET_BUSINESS_CLIENTS_FORM, { variables: { businessId: selectedBusiness?.id }, skip: !selectedBusiness}); 
  const { data: servicesData, loading: loadingServices } = useQuery(GET_BUSINESS_SERVICES_FORM, { variables: { businessId: selectedBusiness?.id }, skip: !selectedBusiness}); 

  useEffect(() => {
    if (availabilityData) setAvailability(availabilityData.getUserAvailability)
  }, [availabilityData, loadingAvailability]);

  useEffect(() => {
    if (userBusinessesData) {
      setBusinesses(userBusinessesData.getUserBusinesses);
    }
  }, [userBusinessesData]);

  // Prepopulate data incrementally if editing an existing appointment
  useEffect(() => {
    if (!prepopulating || !initialAppointment) return;
    setSelectedBusiness(initialAppointment.business);
    const date = new Date(initialAppointment.start_date);
    const [month, day, year] = date.toLocaleDateString().split('/').map(str => str.length === 1 ? `0${str}` : str);
    setId(initialAppointment.id);
    setDate(`${year}-${month}-${day}`);
    setHours(date.getHours() % 12 || 12);
    setMin(date.getMinutes());
    setPeriod(date.getHours() > 11 ? 'pm' : 'am');
    setIsPaid(initialAppointment.is_paid);
  }, [initialAppointment, prepopulating]);
  useEffect(() => {
    if (!prepopulating || !initialAppointment) return;
    if (!clientsData || !servicesData) return;

    setSelectedClient(clientsData.getBusinessClients.find((c: FormClient) => c.id === initialAppointment.client.id));
    setSelectedService(servicesData.getBusinessServices.find((s: FormService) => s.id === initialAppointment.service.id));
    setPrepopulating(false);
  }, [clientsData, initialAppointment, prepopulating, servicesData]);


  // Prepopulate client & business data if booking a new appointment in clients view
  useEffect(() => {
    if (!initialClientBusiness) return;

    setSelectedBusiness(initialClientBusiness.business);
    setSelectedClient({
      avatar: initialClientBusiness.client.avatar,
      id: initialClientBusiness.client.id,
      name: initialClientBusiness.client.name,
    });
  }, [initialClientBusiness]);

  const availabilityMap = useMemo(() => {
    const map = new Map<string, AvailabilitySlice[]>();
    availability.forEach(avail => map.set(avail.business_id, [...map.get(avail.business_id) ?? [], avail]));
    return map;
  }, [availability]);

  const startEndDates: [string, string] | undefined = useMemo(() => {
    if (!date || !hours || min === undefined || !period || !selectedService) return;

    const dateObj = new Date();
    const [year, month, day] = date.split('-').map(d => Number(d));
    dateObj.setFullYear(year);
    dateObj.setMonth(month - 1); // 0 indexed
    dateObj.setDate(day);
    dateObj.setHours(hours + (period === 'pm' ? 12 : 0), min, 0, 0);

    const start = dateObj.toISOString();
    dateObj.setTime(dateObj.getTime() + 1000 * 60 * selectedService.duration);
    const end = dateObj.toISOString();

    return [start,end];
  }, [date, hours, min, period, selectedService]);

  const isWithinBookingHours = useMemo(() => {
    if (!selectedBusiness || !startEndDates) return true;
    const day = new Date(startEndDates[0]).getDay();

    const current = availabilityMap.get(selectedBusiness.id)?.filter(s => {
      let dayind = s.day;
      let converted = dayind === 6 ? 0 : dayind + 1;
      return day === converted;
    }) ?? [];

    // Convert start and end times to military HR:MN time for comparison check
    const [start, end]: [number, number] = startEndDates
      .map(d => new Date(d)
        .toTimeString()
        .split(' ')[0]
        .split(':')
        .slice(0, 2)
        .join(''))
      .map(d => Number(d)) as [number,number];

    return current.some((slice) => {
      const range: [number, number] = [slice.start_time, slice.end_time]
        .map(str => Number(str.split(':').join(''))) as [number, number];
      return inRange(range, start) && inRange(range, end);
    });
  }, [availabilityMap, selectedBusiness, startEndDates]);
  
  const appointment = useMemo<AppointmentInput | null>(() => {
    if (!selectedBusiness || !selectedClient || !selectedService || !startEndDates) return null;


    return {
      id: id ?? uuid(),
      user_id: userId,
      service_id: selectedService.id,
      business_id: selectedBusiness.id,
      client_id: selectedClient.id,
      start_date: startEndDates[0].toString(),
      end_date: startEndDates[1].toString(),
      service_duration: selectedService.duration,
      service_cost: selectedService.cost,
      is_video: selectedService.is_video,
      is_paid: isPaid,
    }
  }, [id, isPaid, selectedBusiness, selectedClient, selectedService, startEndDates, userId]);

  const [addEditAppointment, { 
    data: appMutationData, 
    loading: appMutationLoading, 
    error: appMutationError, 
    reset: appMutationReset 
  }] = useMutation(ADD_EDIT_APPOINTMENT, {
    refetchQueries: [{
      query: GET_CLIENT_APPOINTMENTS,
      variables: { clientId: selectedClient?.id }
    }],
    update(cache, { data: { addEditAppointment }}) {
      cache.modify({
        fields: {
          getUserAppointments(existingAppointments = [], { readField }) {
            const newAppointmentRef = cache.writeFragment({
              data: addEditAppointment,
              fragment: gql`
                ${NEW_APPOINTMENT_FRAGMENT}
              `
            });
            return initialAppointment 
              ? existingAppointments.map((ref: any) => readField('id', ref) === readField('id', newAppointmentRef) ? newAppointmentRef : ref)
              : [...existingAppointments, newAppointmentRef];
          }
        }
      })
    }
  });

  useEffect(() => {
    if (!appMutationData || appMutationLoading) return;
    if (appMutationError) {
      return setError('Something went wrong'); // for now
    }
    
    setSelectedBusiness(undefined);
    setDate(undefined);
    setHours(undefined);
    setMin(undefined);
    setPeriod('am');
    setError(undefined);
    appMutationReset();
    setOpen(false);
    onSubmit && onSubmit();
  }, [appMutationData, appMutationError, appMutationLoading, appMutationReset, onSubmit, setOpen]);

  const [deleteAppointment, { 
    data: deleteAppointmentData, 
    loading: deleteAppointmentLoading, 
    error: deleteAppointmentError, 
    reset: deleteAppointmentReset 
  }] = useMutation(DELETE_APPOINTMENT, {
    refetchQueries: [{
      query: GET_CLIENT_APPOINTMENTS,
      variables: { clientId: selectedClient?.id }
    }],
    update(cache) {
      cache.modify({
        fields: {
          getUserAppointments(existingAppointments = [], { readField }) {
            return existingAppointments.filter((ref: any) => appointment!.id !== readField('id', ref));
          }
        }
      })
    }
  });

  useEffect(() => {
    if (deleteAppointmentData && !deleteAppointmentLoading && !deleteAppointmentError) return setOpen(false);
    if (deleteAppointmentError) setError(deleteAppointmentError.message);
    deleteAppointmentReset();
  }, [deleteAppointmentData, deleteAppointmentError, deleteAppointmentLoading, deleteAppointmentReset, setOpen]);

  const onDeleteAppointment = useCallback(() => {
    deleteAppointment({variables: { appointmentId: initialAppointment!.id }});
  }, [deleteAppointment, initialAppointment]);

  const onSubmitForm = useCallback(() => {
    if (!appointment) return;
    addEditAppointment({variables: { appointment, edit: !!initialAppointment }});
  }, [addEditAppointment, appointment, initialAppointment]);

  const businessesList = useMemo(() => businesses.map(b => (
    <div key={b.id} className={styles.option} onClick={() => {setSelectedBusiness(b)}}>
      <p>{b.name}</p>
    </div>
  )), [businesses]);

  const clientsList = useMemo(() => clientsData?.getBusinessClients 
    ? clientsData.getBusinessClients
        .map((c: FormClient) => (
          <div key={c.name} className={styles.option} onClick={() => setSelectedClient(c)}>
            <Avatar src={c.avatar} size={28} />
            <p>{c.name}</p>
          </div>
        ))
    : []
  , [clientsData]);

  const servicesList = useMemo(() => servicesData?.getBusinessServices 
    ? servicesData.getBusinessServices 
      .filter((s: FormService) => !s.deleted)
      .map((s: FormService) => (
        <div key={s.id} style={{borderLeftColor: s.color}} className={clsx(styles.option, styles.service)} onClick={() => setSelectedService(s)}>
          {s.is_video && <BsFillCameraVideoFill size={16} color={'grey'} />}
          <p>{s.name}</p>
        </div>
      ))
    : []
  , [servicesData]);

  return (
    <Modal actionButtonText='Confirm' 
      onAction={onSubmitForm} 
      actionButtonDisabled={!appointment} 
      open={open} 
      onClose={() => setOpen(false)} 
      className={styles.appointmentForm}
      loading={prepopulating || loadingClients || loadingServices || appMutationLoading || deleteAppointmentLoading}
    >
      <Modal.Header>{initialAppointment ? "Edit" : "Create an"} Appointment</Modal.Header>
      <div className={styles.appointmentOptions}>
        {!fromClientForm && <>
          <p>Select a provider</p>
          <Select list={businessesList} selected={(
            <div className={styles.selectedOption}>
              <p>{selectedBusiness?.name}</p>
            </div>
          )} hasSelected={!!selectedBusiness}/>
        </>}
        {!fromClientForm && <>
          <p>Select a client</p>
          <Select disabled={!selectedBusiness} list={clientsList} hasSelected={!!selectedClient} selected={(
            <div className={styles.selectedOption}>
              <Avatar src={selectedClient?.avatar} size={28} />
              <p>{selectedClient?.name}</p>
            </div>
          )}/>
        </>}
        <p>Select a service</p>
        <Select disabled={!selectedBusiness} list={servicesList} hasSelected={!!selectedService} selected={(
          <div className={styles.selectedOption}>
            {selectedService?.is_video && <BsFillCameraVideoFill size={16} color={'grey'} />}
            <p>{selectedService?.name}</p>
          </div>
        )}/>
        <p>Select date and time</p>
        <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className={styles.dateInput} />
        <div className={styles.timeSelect}>
          <Select list={HoursList(setHours)} selected={<p>{hours}</p> } placeholder="hr" hasSelected={!!hours} />
          <p>:</p>
          <Select list={MinutesList(setMin)} selected={<p>{min === 0 ? '00' : min}</p>} placeholder="min" hasSelected={min !== undefined} />
          <Select list={PeriodList(setPeriod)} selected={<p>{period}</p>} hasSelected />
        </div>
        <div className={styles.ispaid}>
          <label htmlFor='ispaid'>Mark as paid</label>
          <Input id='ispaid' type='checkbox' checked={isPaid} onChange={(e) => setIsPaid(e.target.checked)} />  
        </div>
      </div>
      <hr />
      <p className={styles.appointmentDate}>{startEndDates ? formatFullDateString(startEndDates[0]) : '...'}</p>        
      <AppointmentActionCard 
        app={{ 
          start_date: startEndDates?.[0] ?? 0, 
          service: {
            name: selectedService?.name ?? '...',
            duration: selectedService?.duration ?? 0,
            color: selectedService?.color
          },
          client: {
            name: selectedClient?.name ?? '...',
          }
        } as unknown as AppointmentData} 
        mini
      />
      <p className={styles.warning}>{!isWithinBookingHours && startEndDates && '* warning: this appointment falls out of booking hours'}</p>
      {error && <p className={styles.warning}>{error}</p>}
      {!!initialAppointment && <div className={styles.delete} onClick={() => setConfirmDelete(true)}>
        <BsTrash3 />
        <p>Unschedule</p>
      </div>}
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} actionButtonText="Confirm" onAction={() => {setConfirmDelete(false); onDeleteAppointment()}} >
        <Modal.Header>Confirm Unschedule</Modal.Header>
        <div className={styles.confirmDelete}>
          <p>Are you sure you want to unschedule this appointment?</p>
          <p className={styles.appointmentDate}>{startEndDates ? formatFullDateString(startEndDates[0]) : '...'}</p>        
          <AppointmentActionCard 
            app={{ 
              start_date: startEndDates?.[0] ?? 0, 
              service: {
                name: selectedService?.name ?? '...',
                duration: selectedService?.duration ?? 0,
                color: selectedService?.color
              },
              client: {
                name: selectedClient?.name ?? '...',
              }
            } as unknown as AppointmentData} 
            mini
          />
        </div>
      </Modal>
    </Modal>
  )
}