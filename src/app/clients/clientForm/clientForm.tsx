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
import { GET_MULTI_CLIENT, USER_ADD_CLIENT, USER_EDIT_CLIENT } from '@/utility/queries/clientQueries';
import { GET_BUSINESS_CLIENTS } from '@/utility/queries/businessQueries';
import { NEW_CLIENT_FRAGMENT } from '@/utility/queries/fragments/clientFragments';

interface AppointmentFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  setSelected?: React.Dispatch<React.SetStateAction<Client | undefined>>,
  userId: string,
  initialClient?: Client,
  onSubmit?: (...args: any) => any,
}

interface RawClient {
  id: string,
  name: string,
  email: string,
  address?: string,
  phone?: string,
  avatar: string
}

export const ClientForm: React.FC<AppointmentFormProps> = ({open, setOpen, setSelected, userId, initialClient, onSubmit}) => {
  const [error, setError] = useState<string>();
  const [id, setId] = useState<string>(uuid());
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const [selectedBusiness, setSelectedBusiness] = useState<FormBusiness>();
  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);

  const [placeholderClient, setPlaceholderClient] = useState<RawClient>();

  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 
  const { data: multiClientData, loading: loadingMultiClientData } = useQuery(GET_MULTI_CLIENT, { variables: { clientId: initialClient?.id }, skip: !initialClient});

  useEffect(() => {
    if (userBusinessesData) {
      setBusinesses(userBusinessesData.getUserBusinesses);
    }
  }, [userBusinessesData]);

  // Initialize fields when editing existing client
  useEffect(() => {
    console.log('init', initialClient);
    console.log('data', multiClientData);
    if (!initialClient || (initialClient && !multiClientData)) return;

    const { business_patch: { name, email, phone, address, notes }, client } = multiClientData.getMultiClientData;

    console.log(name, email, phone, address, notes)

    setPlaceholderClient(client);

    name && setName(name);
    email && setEmail(email);
    phone && setPhone(phone);
    address && setAddress(address);
    notes && setNotes(notes);
  }, [initialClient, multiClientData]);

  const client = useMemo<ClientInput | null>(() => {
    if (!name || !email || !selectedBusiness) return null;
    
    return {
      id,
      business_id: selectedBusiness.id,
      name,
      email,
      notes: notes || undefined,
      address: address || undefined,
      phone: phone || undefined,
      joined_date: new Date().toISOString(),
      active: true,
    }
  }, [address, email, id, name, notes, phone, selectedBusiness]);

  const editClient = useMemo<ClientInput | null>(() => {
    if (!initialClient || (initialClient && !multiClientData)) return null;

    // Raw client data from client table 
    const raw = multiClientData.getMultiClientData.client;
    
    return {
      id: raw.id,
      business_id: '', // Not used in gql resolver
      name: name || raw.name,
      email: email || raw.email,
      notes: notes || raw.notes,
      address: address || raw.address,
      phone: phone || raw.phone,
      joined_date: new Date().toISOString(),
      active: true,
    }
  }, [address, email, initialClient, multiClientData, name, notes, phone]);

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
    setSelected && setSelected(clientMutationData.userAddClient);
    complete();
  }, [clientMutationData, clientMutationError, clientMutationLoading, complete, setSelected]);

  useEffect(() => {
    if (!clientEditData || clientEditLoading) return;
    if (clientEditError) return setError('Something went wrong');
    setSelected && setSelected(clientEditData.userEditClient);
    complete();
  }, [clientEditData, clientEditError, clientEditLoading, complete, setSelected]);

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
      actionButtonDisabled={initialClient ? !editClient : !client} 
      open={open} 
      onClose={() => setOpen(false)} 
      className={styles.appointmentForm}
      loading={loadingUserBusinesses || clientMutationLoading || (initialClient && loadingMultiClientData)}
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
        <Input type='text' autoFocus placeholder={initialClient ? placeholderClient?.name || '' : 'John Doe'} value={name} onChange={(e) => setName(e.target.value)} />

        <p>Email</p>
        <Input type='text' placeholder={initialClient ? placeholderClient?.email || '' : 'johndoe@gmail.com'} value={email} onChange={(e) => setEmail(e.target.value)} />

        <p>Address</p>
        <Input type='text' placeholder={initialClient ? placeholderClient?.address || '' : '1234 John Doe St.'} value={address} onChange={(e) => setAddress(e.target.value)} />

        <p>Phone</p>
        <Input type='text' placeholder={initialClient ? placeholderClient?.phone || '' : '123-456-7890'} value={phone} onChange={(e) => setPhone(e.target.value)} />

        <p>Notes</p>
        <textarea placeholder={!initialClient ? 'Modified rate to 90%.' : ''} value={notes} onChange={(e) => setNotes(e.target.value)} />

      </div>
      <hr />
      <p className={styles.warning}>{initialClient ? !editClient : !client && 'missing fields'}</p>
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