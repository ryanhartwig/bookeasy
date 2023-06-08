import { AppointmentCard } from "@/app/home/clients/appointment"
import { useUser } from "@/app/Providers"
import { Spinner } from "@/components/UI/Spinner/Spinner"
import { Tabs } from "@/components/UI/Tabs/Tabs"
import { AppointmentData } from "@/types/Appointment"
import { GET_REGISTERED_CLIENT_APPOINTMENTS } from "@/utility/queries/appointmentQueries"
import { useQuery } from "@apollo/client"
import React, { useEffect, useMemo, useState } from "react"
import styles from './book.module.scss';


interface ClientAppsProps {
}

export const ClientApps: React.FC<ClientAppsProps> = () => {
  const { id: registeredUserId } = useUser();
  
  const [tab, setTab] = useState(0);
  const [appointments, setAppointments] = useState<AppointmentData[]>([]);
  const { data: clientAppointmentData, loading: loadingClientAppointments } = useQuery(GET_REGISTERED_CLIENT_APPOINTMENTS, { variables: { registeredUserId }});
  useEffect(() => clientAppointmentData && setAppointments(clientAppointmentData.getRegisteredClientAppointments), [clientAppointmentData]);

  const previous = useMemo<AppointmentData[]>(() => {
    return appointments.filter(app => 
      app.start_date < new Date().toISOString()
    ).sort((a, b) => a.start_date < b.start_date ? 1 : -1);
  }, [appointments]);

  const booked = useMemo<AppointmentData[]>(() => {
    return appointments.filter(app => 
      app.start_date >= new Date().toISOString()
    ).sort((a, b) => a.start_date < b.start_date ? -1 : 1);
  }, [appointments]);

  return (
    <div>
      <Tabs tabs={['Booked', 'Previous']} tab={tab} setTab={setTab} />
      <div className={styles.results}>
        {loadingClientAppointments && <Spinner />}
        {tab === 0
          ? booked.map((app) => <AppointmentCard key={app.id} app={app} showProvider allowCancellation />)
          : previous.map((app) => <AppointmentCard key={app.id} app={app} showProvider/>)}
      </div>
    </div>
  )
}