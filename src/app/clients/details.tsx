import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { Tabs } from '@/components/UI/Tabs/Tabs';
import { AppointmentData } from '@/types/Appointment';
import { NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { GET_CLIENT_APPOINTMENTS } from '@/utility/queries/appointmentQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import { AppointmentForm } from '../dashboard/appointmentForm/appointmentForm';
import { AppointmentCard } from './appointment';
import { ClientForm } from './clientForm/clientForm';
import styles from './clients.module.scss';

interface DetailsProps {
  selected: Client,
  setSelected: React.Dispatch<React.SetStateAction<Client | undefined>>,
  userId: string,
  selectedBusiness: NewBusiness,
}

export const Details: React.FC<DetailsProps> = ({selected, setSelected, userId, selectedBusiness}) => {
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const { data, loading } = useQuery(GET_CLIENT_APPOINTMENTS, { variables: { clientId: selected.id }});

  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentData>();
  const [appointmentFormOpen, setAppointmentFormOpen] = useState<boolean>(false);

  const [bookFormOpen, setBookFormOpen] = useState<boolean>(false);
    
  useEffect(() => {
    if (!selectedAppointment) return;
    setAppointmentFormOpen(true);
  }, [selectedAppointment]);

  useEffect(() => {
    if (appointmentFormOpen) return;
    setSelectedAppointment(undefined);
  }, [appointmentFormOpen]);
  

  const [formOpen, setFormOpen] = useState<boolean>(false);

  useEffect(() => {
    if (!data || loading) return;
    setAppointments(data.getClientAppointments);
  }, [data, loading]);
  
  const previous = useMemo<AppointmentData[]>(() => {
    return appointments.filter(app => 
      app.client.id === selected.id && app.start_date < new Date().toISOString()
    ).sort((a, b) => a.start_date < b.start_date ? 1 : -1);
  }, [appointments, selected.id]);

  const booked = useMemo<AppointmentData[]>(() => {
    return appointments.filter(app => 
      app.client.id === selected.id && app.start_date >= new Date().toISOString()
    ).sort((a, b) => a.start_date < b.start_date ? -1 : 1);
  }, [appointments, selected.id]);

  const unpaid = useMemo<string>(() => {
    return previous.concat(booked)
      .filter(app => !app.is_paid)
      .map(app => app.service_cost)
      .reduce((a, b) => a + b, 0)
      .toFixed(2)
  }, [booked, previous]);

  const paid = useMemo<string>(() => {
    return previous.concat(booked)
      .filter(app => app.is_paid)
      .map(app => app.service_cost)
      .reduce((a, b) => a + b, 0)
      .toFixed(2)
  }, [booked, previous]);

  const [tab, setTab] = useState<number>(0);

  return (
    <div className={styles.details}>
      <div>
        {/* Client photo, name, contact info, notes */}
        <Card className={clsx(styles.card, styles.client_details)} style={{height: 444}}>
          <Avatar src={selected.avatar} size={115} />
          <p className={styles.client_name}>{selected.name}</p>
          <hr />
          <div className={styles.client_contact}>
            <div>
              <p className={styles.label}>phone</p>
              <p>{selected.phone}</p>
            </div>
            <div>
              <p className={styles.label}>email</p>
              <p>{selected.email}</p>
            </div>
            <div>
              <p className={styles.label}>address</p>
              <p>{selected.address}</p>
            </div>
          </div>
          <p className={styles.label} style={{width: '95%', marginTop: 5}}>notes</p>
          <div className={styles.notes}>
            <p>{selected.notes}</p>
          </div>
          <p className={styles.edit} onClick={() => setFormOpen(true)}>Edit</p>
        </Card>

        {/* Client metrics (total appointments, calculated revenue, etc) */}
        <Card className={clsx(styles.card, styles.metrics)} style={{height: 272}}>
            <div className={styles.metric}>
              <p>{previous.length}</p>
              <p className={styles.label}>Past Appointments</p>
            </div>
            <hr />
            <div className={styles.metric}>
              <p>{booked.length}</p>
              <p className={styles.label}>Booked Appointments</p>
            </div>
            <hr />
            <div className={styles.metric}>
              <p>${paid}</p>
              <p className={styles.label}>Total Paid</p>
            </div>
            <hr />
            <div className={styles.metric}>
              <p>${unpaid}</p>
              <p className={styles.label}>Total Unpaid</p>
            </div>  
        </Card>

        {/* EDIT CLIENT FORM */}
        {selected && <ClientForm initialClient={selected} open={formOpen} setOpen={setFormOpen} userId={userId} onSubmit={() => setFormOpen(false)} setSelected={setSelected} />}

      </div>
      <div>
        <Card className={clsx(styles.card, styles.apps)} style={{height: 736, position: 'relative'}}>
          <Tabs tabs={['Booked', 'Previous']} tab={tab} setTab={setTab} />
          <div className={styles.results}>
            {tab === 0
              ? booked.map((app) => <AppointmentCard key={app.id} app={app} setSelectedAppointment={setSelectedAppointment} />)
              : previous.map((app) => <AppointmentCard key={app.id} app={app} setSelectedAppointment={setSelectedAppointment} />)}
          </div>
          <div className={styles.book} onClick={() => setBookFormOpen(true)}>
            <p>+ Book New</p>
          </div>
        </Card>
        {selectedAppointment && <AppointmentForm open={appointmentFormOpen} setOpen={setAppointmentFormOpen} userId={userId} initialAppointment={selectedAppointment} onSubmit={() => setSelectedAppointment(undefined)} fromClientForm />}
        {bookFormOpen && selected && <AppointmentForm open={bookFormOpen} setOpen={setBookFormOpen} userId={userId} initialClientBusiness={{client: selected, business: selectedBusiness}} fromClientForm />}
      </div>
    </div>
  )
}