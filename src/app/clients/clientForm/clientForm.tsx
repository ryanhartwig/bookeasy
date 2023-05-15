import styles from './clientForm.module.scss';
import uuid from "react-uuid"

import { Modal } from "@/components/UI/Modal/Modal"
import { useCallback, useEffect, useMemo, useState } from "react"
import { BsTrash3 } from 'react-icons/bs';
import { gql, useMutation, useQuery } from "@apollo/client"
import { Client, ClientInput, EditClientInput } from '@/types/Client';
import { Input } from '@/components/UI/Input/Input';
import { FormBusiness, NewBusiness } from '@/types/Business';
import { GET_USER_BUSINESSES } from '@/utility/queries/userQueries';
import { Select } from '@/components/UI/Select/Select';
import { DELETE_CLIENT, USER_ADD_CLIENT, USER_EDIT_CLIENT } from '@/utility/queries/clientQueries';
import { GET_BUSINESS_CLIENTS } from '@/utility/queries/businessQueries';
import { NEW_CLIENT_FRAGMENT } from '@/utility/queries/fragments/clientFragments';
import { Avatar } from '@/components/UI/Avatar/Avatar';

interface AppointmentFormProps {
  open: boolean,
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>,  
  setSelected?: React.Dispatch<React.SetStateAction<Client | undefined>>,
  userId?: string,
  initialClient?: Client,
  onSubmit?: (...args: any) => any,
  initialBusiness?: FormBusiness
}

export const ClientForm: React.FC<AppointmentFormProps> = ({open, setOpen, setSelected, initialBusiness, userId, initialClient, onSubmit}) => {
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

  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }, skip: !!initialClient || !!initialBusiness }); 

  useEffect(() => userBusinessesData && setBusinesses(userBusinessesData.getUserBusinesses), [userBusinessesData]);
  console.log(selectedBusiness);
  console.log('initial business', initialBusiness);
  
  // Initialize fields when editing existing client
  useEffect(() => {
    initialBusiness && setSelectedBusiness(initialBusiness);
    
    if (!initialClient) return;


    // have to set the selected business on edit
    
    
    setName(initialClient.name || '');
    setEmail(initialClient.email || '');
    setPhone(initialClient.phone || '');
    setAddress(initialClient.address || '');
    setNotes(initialClient.notes || '');
    setId(initialClient.id);
  }, [initialBusiness, initialClient]);

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

  const [userAddClient, { 
    data: clientMutationData, 
    loading: clientMutationLoading, 
    error: clientMutationError, 
    reset: clientMutationReset,
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
    reset: clientEditReset,
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
            return existingClients.map((ref: any) => readField('id', ref) === initialClient?.id ? editClientRef : ref)
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
    setOpen && setOpen(false);
    onSubmit && onSubmit();
  }, [onSubmit, setOpen]);
  
  useEffect(() => {
    if (!clientMutationData || clientMutationLoading) return;
    if (clientMutationError) return setError('Something went wrong'); // for now
    setSelected && setSelected(clientMutationData.userAddClient);
    clientMutationReset();
    complete();
  }, [clientMutationData, clientMutationError, clientMutationLoading, clientMutationReset, complete, setSelected]);

  useEffect(() => {
    if (!clientEditData || clientEditLoading) return;
    if (clientEditError) return setError('Something went wrong');
    setSelected && setSelected(clientEditData.userEditClient);
    clientEditReset();
    complete();
  }, [clientEditData, clientEditError, clientEditLoading, clientEditReset, complete, setSelected]);

  const [deleteClient, { 
    data: deleteClientData, 
    loading: deleteClientLoading, 
    error: deleteClientError, 
  }] = useMutation(DELETE_CLIENT, {
    update(cache) {
      cache.modify({
        fields: {
          getBusinessClients(existingClients = [], { readField }) {
            return existingClients.filter((ref: any) => client!.id !== readField('id', ref));
          }
        }
      })
    }
  });

  useEffect(() => {
    if (deleteClientData && !deleteClientLoading && !deleteClientError) {
      setSelected && setSelected(undefined);
      setOpen && setOpen(false);
    };
    if (deleteClientError) setError(deleteClientError.message);
  }, [deleteClientData, deleteClientError, deleteClientLoading, setOpen, setSelected]);

  const onDeleteClient = useCallback(() => {
    deleteClient({variables: { clientId: client!.id }});
  }, [client, deleteClient]);

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
      actionCloses
      onClose={() => setOpen && setOpen(false)} 
      className={styles.appointmentForm}
      loading={loadingUserBusinesses || clientMutationLoading}
    >
      <Modal.Header>{initialClient ? "Edit" : "New"} Client</Modal.Header>
      <div className={styles.appointmentOptions}>
        {/* Cannot change provider when editing a client or adding from business/teams view */}
        {!initialClient && !initialBusiness && (
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
        <Input type='text' autoFocus value={name} onChange={(e) => setName(e.target.value)} />

        <p>Email</p>
        <Input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />

        <p>Address</p>
        <Input type='text' value={address} onChange={(e) => setAddress(e.target.value)} />

        <p>Phone</p>
        <Input type='text' value={phone} onChange={(e) => setPhone(e.target.value)} />

        <p>Notes</p>
        <textarea placeholder={!initialClient ? 'Modified rate to 90%.' : ''} value={notes} onChange={(e) => setNotes(e.target.value)} />

      </div>
      <hr />
      {error && <p className={styles.warning}>{error}</p>}
      {!!initialClient && <div className={styles.delete} onClick={() => setConfirmDelete(true)}>
        <BsTrash3 />
        <p>Remove Client</p>
      </div>}
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} actionButtonText="Confirm" actionCloses onAction={() => {setConfirmDelete(false); onDeleteClient()}} >
        <Modal.Header>Confirm Delete</Modal.Header>
        <div className={styles.confirmDelete}>
          <p>Are you sure you want to remove this client?</p>
          <div>
            <Avatar src={initialClient?.avatar} />
            <p>{initialClient?.name}</p>
          </div>
          <p>(all appointment data will be lost)</p>
        </div>
      </Modal>
    </Modal>
  )

}