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
import { AiOutlineMinusCircle, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import { Avatar } from '@/components/UI/Avatar/Avatar';

interface ServiceFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  userId: string,
  onSubmit?: (...args: any) => any,
}

export const ServiceForm: React.FC<ServiceFormProps> = ({open, setOpen, userId, onSubmit}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<FormBusiness>();
  const [error, setError] = useState<string>();

  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [cost, setCost] = useState<string>('');
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#1934b8');

  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);

  const [assignedUsers, setAssignedUsers] = useState<User[]>([]);

  useWaterfall([
    [[selectedBusiness, setSelectedBusiness]], // first waterfall chunk
    [[assignedUsers, setAssignedUsers]], // second chunk, resets when first updates
  ], undefined);

  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 
  // const { data: serviceUsersData, loading: loadingServiceUsersData } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 

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
      cost: Number(cost), 
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

        <p>Select a Assignee(s)</p>
        <Select list={businessesList} selected={(
          <div className={styles.selectedOption}>
            <p>{selectedBusiness?.name}</p>
          </div>
        )} hasSelected={!!selectedBusiness}/>

        <div className={styles.assignees}>
          {assignedUsers.map(user => 
            <div key={user.id}>
              <Avatar src={user.avatar} size={26} />
              <p>{user.name}</p>
            </div>
          )}
        </div>

        <p>Service Name</p>
        <Input type='text' autoFocus placeholder='Initial Consult' value={name} onChange={(e) => setName(e.target.value)} />

        <p>Cost</p>
        <Input type='text' placeholder='120.00' value={cost} onChange={(e) => isNaN(Number(e.target.value)) ? undefined : setCost(e.target.value)} onBlur={() => setCost(p => Number(p).toFixed(2).toString())} />

        <p>Duration</p>
        <div className={styles.durationSelect}>
          <AiOutlineMinusCircle onClick={() => setDuration(p => p === 15 ? p : p - 15)} />
          <p>{duration > 45 && `${Math.floor(duration / 60)} hr${Math.floor(duration / 60) > 1 ? 's' : ''}`} {duration % 60} mins</p>
          <AiOutlinePlusCircle onClick={() => setDuration(p => p === 720 ? p : p + 15)} />
        </div>

        <p>Service Color</p>
        <Input type='color' placeholder='120' value={color} onChange={(e) => setColor(e.target.value)} />

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