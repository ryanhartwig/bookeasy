import styles from './serviceForm.module.scss';
import uuid from "react-uuid"

import { Modal } from "@/components/UI/Modal/Modal"
import { Select } from "@/components/UI/Select/Select"
import { FormBusiness, NewBusiness } from "@/types/Business"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useWaterfall } from "@/utility/hooks/useWaterfall"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER_BUSINESSES } from "@/utility/queries/userQueries"
import { GET_BUSINESS_SERVICES } from "@/utility/queries/businessQueries"
import { ADD_EDIT_APPOINTMENT } from "@/utility/queries/appointmentQueries"
import { ServiceInput } from '@/types/Service';
import { Input } from '@/components/UI/Input/Input';
import { User } from '@/types/User';

interface ServiceFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  userId: string,
  onSubmit?: (...args: any) => any,
}

export const ServiceForm: React.FC<ServiceFormProps> = ({open, setOpen, userId, onSubmit}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<FormBusiness>();
  const [error, setError] = useState<string>();

  const [name, setName] = useState<string>();
  const [duration, setDuration] = useState<number>();
  const [cost, setCost] = useState<number>();
  const [isVideo, setIsVideo] = useState<boolean>();
  const [color, setColor] = useState<string>();

  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);

  useWaterfall([
    [[selectedBusiness, setSelectedBusiness]], // first waterfall chunk
    [[assignedUsers, setAssignedUsers]], // second chunk, resets when first updates
  ], undefined);

  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 

  useEffect(() => {
    if (userBusinessesData) {
      setBusinesses(userBusinessesData.getUserBusinesses);
    }
  }, [userBusinessesData]);

  const service = useMemo<ServiceInput | null>(() => {
    if (!selectedBusiness || !name || !duration || !cost || !color || !isVideo || !assignedUsers.length) return null;

    return {
      id: uuid(),
      business_id: selectedBusiness.id,
      name,
      duration,
      provider: selectedBusiness.name,
      cost, 
      is_video: isVideo,
      color,
      deleted: false,
      assigned_users: assignedUsers,
    }
  }, [assignedUsers, color, cost, duration, isVideo, name, selectedBusiness]);

  const [addService, { 
    data: addServiceData, 
    loading: addServiceLoading, 
    error: addServiceError, 
    reset: addServiceReset 
  }] = useMutation(ADD_EDIT_APPOINTMENT, {
    refetchQueries: [{
      query: GET_BUSINESS_SERVICES,
      variables: { businessId: selectedBusiness?.id }
    }],
  });

  useEffect(() => {
    if (!addServiceData || addServiceLoading) return;
    if (addServiceError) {
      return setError('Something went wrong'); // for now
    }
    
    addServiceReset();
    setOpen(false);
    onSubmit && onSubmit();
  }, [addServiceData, addServiceError, addServiceLoading, addServiceReset, onSubmit, setOpen]);

  const onSubmitForm = useCallback(() => {
    if (!service) return;
    addService({variables: { service }});
  }, [addService, service]);

  const businessesList = useMemo(() => businesses.map(b => (
    <div key={b.id} className={styles.option} onClick={() => {setSelectedBusiness(b)}}>
      <p>{b.name}</p>
    </div>
  )), [businesses]);

  return (
    <Modal actionButtonText='Confirm' 
      onAction={onSubmitForm} 
      actionButtonDisabled={!service} 
      open={open} 
      onClose={() => setOpen(false)} 
      className={styles.appointmentForm}
      loading={addServiceLoading}
    >
      <Modal.Header>Add a Service</Modal.Header>
      <div className={styles.appointmentOptions}>
        <p>Select a provider</p>
        <Select list={businessesList} selected={(
          <div className={styles.selectedOption}>
            <p>{selectedBusiness?.name}</p>
          </div>
        )} hasSelected={!!selectedBusiness}/>

        {/* <p>Select date and time</p> */}
        {/* <input type='date' value={date} onChange={(e) => setDate(e.target.value)} className={styles.dateInput} /> */}

        
        <div className={styles.ispaid}>
          <label htmlFor='ispaid'>Is Video Service</label>
          <Input id='ispaid' type='checkbox' checked={isVideo} onChange={(e) => setIsVideo(e.target.checked)} />  
        </div>
      </div>
      <hr />
      {error && <p className={styles.warning}>{error}</p>}
    </Modal>
  )
}