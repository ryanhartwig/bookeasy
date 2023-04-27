import styles from './clientForm.module.scss';
import uuid from "react-uuid"

import { Modal } from "@/components/UI/Modal/Modal"
import { useCallback, useEffect, useMemo, useState } from "react"
import { BsTrash3 } from 'react-icons/bs';
import { gql, useMutation, useQuery } from "@apollo/client"
import { DELETE_APPOINTMENT } from "@/utility/queries/appointmentQueries"
import { Client, ClientInput } from '@/types/Client';
import { Input } from '@/components/UI/Input/Input';
import { FormBusiness, NewBusiness } from '@/types/Business';
import { GET_USER_BUSINESSES } from '@/utility/queries/userQueries';
import { Select } from '@/components/UI/Select/Select';
import { USER_ADD_CLIENT, USER_EDIT_CLIENT } from '@/utility/queries/clientQueries';
import { GET_BUSINESS_CLIENTS } from '@/utility/queries/businessQueries';
import { NEW_CLIENT_FRAGMENT } from '@/utility/queries/fragments/clientFragments';

interface AppointmentFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  userId: string,
  initialClient?: Client,
  onSubmit?: (...args: any) => any,
}

export const ClientForm: React.FC<AppointmentFormProps> = ({open, setOpen, userId, initialClient, onSubmit}) => {
  const [error, setError] = useState<string>();
  const [id, setId] = useState<string>(initialClient?.id || '');
  const [name, setName] = useState<string>(initialClient?.name || '');
  const [email, setEmail] = useState<string>(initialClient?.email || '');
  const [notes, setNotes] = useState<string>(initialClient?.notes || '');
  const [address, setAddress] = useState<string>(initialClient?.address || '');
  const [phone, setPhone] = useState<string>(initialClient?.phone || '');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const [selectedBusiness, setSelectedBusiness] = useState<FormBusiness>();
  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);

  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 

  useEffect(() => {
    if (userBusinessesData) {
      setBusinesses(userBusinessesData.getUserBusinesses);
    }
  }, [userBusinessesData]);

  const client = useMemo<ClientInput | null>(() => {
    if (!name || !email || (!initialClient && !selectedBusiness)) return null;
    
    return {
      id: id ?? uuid(),
      business_id: selectedBusiness?.id,
      name,
      email,
      notes: notes ?? undefined,
      address: notes ?? undefined,
      phone: notes ?? undefined,
      joined_date: new Date().toISOString(),
      active: true,
    }
  }, [email, id, initialClient, name, notes, selectedBusiness]);

  const [userAddClient, { 
    data: clientMutationData, 
    loading: clientMutationLoading, 
    error: clientMutationError, 
  }] = useMutation(USER_ADD_CLIENT, {
    refetchQueries: [
      {query: GET_BUSINESS_CLIENTS, variables: { businessId: selectedBusiness?.id }}, 
      'getBusinessClients',
    ]
  });

  const [userEditClient, {
    data: clientEditData,
    loading: clientEditLoading,
    error: clientEditError,
  }] = useMutation(USER_EDIT_CLIENT, {
    update(cache, { data: { userEditClient }}) {
      cache.modify({
        fields: {
          getBusinessClients(existingClients = [], { readField }) {
            const editClientRef = cache.writeFragment({
              data: userEditClient,
              fragment: gql`
                ${NEW_CLIENT_FRAGMENT}
              `
            }); 
            return existingClients.map((ref: any) => readField('id', ref) === readField('id', editClientRef) ? editClientRef : ref)
          }
        }
      })
    }
  });

  const onSubmitForm = useCallback(() => {
    if (!client) return;

    initialClient
      ? userEditClient({ variables: { client } })
      : userAddClient({ variables: { client } })
  }, [client, initialClient, userAddClient, userEditClient]);

  const complete = useCallback(() => {
    setError(undefined);
    setOpen(false);
    onSubmit && onSubmit();
  }, [onSubmit, setOpen]);
  
  useEffect(() => {
    if (!clientMutationData || clientMutationLoading) return;
    if (clientMutationError) return setError('Something went wrong'); // for now
    complete();
  }, [clientMutationData, clientMutationError, clientMutationLoading, complete]);

  useEffect(() => {
    if (!clientEditData || clientEditLoading) return;
    if (clientEditError) return setError('Something went wrong');
    complete();
  }, [clientEditData, clientEditError, clientEditLoading, complete]);

  

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

  

  const businessesList = useMemo(() => businesses.map(b => (
    <div key={b.id} className={styles.option} onClick={() => {setSelectedBusiness(b)}}>
      <p>{b.name}</p>
    </div>
  )), [businesses]);

  return (
    <Modal actionButtonText='Confirm' 
      onAction={onSubmitForm} 
      actionButtonDisabled={!client} 
      open={open} 
      onClose={() => setOpen(false)} 
      className={styles.appointmentForm}
      loading={loadingUserBusinesses || clientMutationLoading}
    >
      <Modal.Header>{initialClient ? "Edit" : "New"} Client</Modal.Header>
      <div className={styles.appointmentOptions}>
        {/* Cannot change provider when editing a client */}
        {!initialClient && (
          <>
            <p>Select a provider</p>
            <Select list={businessesList} selected={(
              <div className={styles.selectedOption}>
                <p>{selectedBusiness?.name}</p>
              </div>
            )} hasSelected={!!selectedBusiness}/>
          </>
        )}
        
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
      <p className={styles.warning}>{!client && 'missing fields'}</p>
      {error && <p className={styles.warning}>{error}</p>}
      {!!initialClient && <div className={styles.delete} onClick={() => setConfirmDelete(true)}>
        <BsTrash3 />
        <p>Remove Client</p>
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