import { Modal } from "@/components/UI/Modal/Modal"
import { Select } from "@/components/UI/Select/Select"
import { Appointment } from "@/types/Appointment"
import { Business } from "@/types/Business"
import { Client } from "@/types/Client"
import { Service } from "@/types/Service"
import { userId } from "@/utility/sample_data/sample_userId"
import { useState } from "react"
import { AppointmentActionCard } from "../appointmentActionCard"

import styles from './appointmentForm.module.scss';

interface AppointmentFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  businesses: Business[],
}

export const AppointmentForm: React.FC<AppointmentFormProps> = ({open, setOpen, businesses}) => {
  
  const [selectedBusiness, setSelectedBusiness] = useState<Business>();
  const [selectedClient, setSelectedClient] = useState<Client>();
  const [selectedService, setSelectedService] = useState<Service>();

  const [appointment, setAppointment] = useState<Appointment>({
    businessId: selectedBusiness?.id ?? '',
    clientId: "",
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

  return (
    <Modal actionButtonText='Confirm' open={open} onClose={() => setOpen(false)} className={styles.appointmentForm}>
      <Modal.Header>Create an Appointment</Modal.Header>
      <div className={styles.appointmentOptions}>
        <p>Select a provider</p>
        <Select list={businesses.map(b => (
          <div key={b.id} className={styles.option}>
            <p>{b.name}</p>
          </div>
        ))} placeholder="..." />
        
        <p>Select a client</p>
        <Select list={[]} placeholder="..." />
        <p>Select a service</p>
        <Select list={[]} placeholder="..." />
        <p>Select date and time</p>
        <Select list={[]} placeholder="..." />
        
      </div>
      <hr />
      <p className={styles.appointmentDate}>...</p>        
      <AppointmentActionCard 
        app={appointment} 
        service={selectedService ?? {color: 'blue', name: '...', duration: 0} as Service} 
        client={selectedClient ?? {name: '...'} as Client}
        mini
      />
      <p className={styles.warning}>warning: this appointment falls out of booking hours</p>
    </Modal>
  )
}