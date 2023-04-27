import styles from './clientForm.module.scss';
import uuid from "react-uuid"

import { Modal } from "@/components/UI/Modal/Modal"
import { AppointmentData } from "@/types/Appointment"
import { useCallback, useEffect, useMemo, useState } from "react"
import { BsTrash3 } from 'react-icons/bs';
import { useMutation } from "@apollo/client"
import { ADD_EDIT_APPOINTMENT, DELETE_APPOINTMENT } from "@/utility/queries/appointmentQueries"
import { Client } from '@/types/Client';
import { gql } from '@apollo/client';
import { NEW_APPOINTMENT_FRAGMENT } from '@/utility/queries/fragments/appointmentFragments';
import { Input } from '@/components/UI/Input/Input';

interface AppointmentFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  userId: string,
  initialAppointment?: AppointmentData,
  onSubmit?: (...args: any) => any,
}

export const ClientForm: React.FC<AppointmentFormProps> = ({open, setOpen, userId, initialAppointment, onSubmit}) => {
  const [error, setError] = useState<string>();
  const [id, setId] = useState<string>();

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const client = useMemo<Client | null>(() => {
    if (!name || !email) return null;
    
    return {
      id: id ?? uuid(),
      name,
      email,
      notes: notes ?? undefined,
      address: notes ?? undefined,
      phone: notes ?? undefined,
      joined_date: new Date().toISOString(),
      active: true,
    }
  }, [email, id, name, notes]);

  const [addEditAppointment, { 
    data: appMutationData, 
    loading: appMutationLoading, 
    error: appMutationError, 
    reset: appMutationReset 
  }] = useMutation(ADD_EDIT_APPOINTMENT, {
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
    update(cache) {
      cache.modify({
        fields: {
          getUserAppointments(existingAppointments = [], { readField }) {
            return existingAppointments.filter((ref: any) => client!.id !== readField('id', ref));
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

  const onDeleteClient = useCallback(() => {
    // implement

  }, []);

  const onSubmitForm = useCallback(() => {
    if (!client) return;
  }, [client]);

  return (
    <Modal actionButtonText='Confirm' 
      onAction={onSubmitForm} 
      actionButtonDisabled={!client} 
      open={open} 
      onClose={() => setOpen(false)} 
      className={styles.appointmentForm}
      loading={appMutationLoading || deleteAppointmentLoading}
    >
      <Modal.Header>{initialAppointment ? "Edit" : "New"} Client</Modal.Header>
      <div className={styles.appointmentOptions}>
        <p>Name</p>
        <Input type='text' autoFocus placeholder='John Doe' value={name} onChange={(e) => setName(e.target.value)} />

        <p>Email</p>
        <Input type='text' placeholder='johndoe@gmail.com' value={email} onChange={(e) => setEmail(e.target.value)} />

        <p>Address</p>
        <Input type='text' placeholder='1234 John Doe St.' value={address} onChange={(e) => setAddress(e.target.value)} />

        <p>Phone</p>
        <Input type='text' placeholder='123-456-7890' value={phone} onChange={(e) => setPhone(e.target.value)} />

        <p>Notes</p>
        <textarea placeholder='Modified rate to 90%.' value={notes} onChange={(e) => setNotes(e.target.value)} />

      </div>
      <hr />
      {/* <p className={styles.warning}>{!client && 'missing fields'}</p> */}
      {error && <p className={styles.warning}>{error}</p>}
      {!!initialAppointment && <div className={styles.delete} onClick={() => setConfirmDelete(true)}>
        <BsTrash3 />
        <p>Unschedule</p>
      </div>}
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} actionButtonText="Confirm" onAction={() => {setConfirmDelete(false); onDeleteClient()}} >
        <Modal.Header>Confirm Delete</Modal.Header>
        <div className={styles.confirmDelete}>
          <p>This is a destructive action. Are you sure you want to remove this client?</p>
        </div>
      </Modal>
    </Modal>
  )
}