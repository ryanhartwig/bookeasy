import styles from './serviceForm.module.scss';
import uuid from "react-uuid"

import { Modal } from "@/components/UI/Modal/Modal"
import { Select } from "@/components/UI/Select/Select"
import { FormBusiness, NewBusiness } from "@/types/Business"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER_BUSINESSES } from "@/utility/queries/userQueries"
import { GET_BUSINESS_SERVICES, GET_BUSINESS_USERS } from "@/utility/queries/businessQueries"
import { ADD_EDIT_APPOINTMENT } from "@/utility/queries/appointmentQueries"
import { ServiceInput } from '@/types/Service';
import { Input } from '@/components/UI/Input/Input';
import { FormUser, User } from '@/types/User';
import { AiOutlineMinusCircle, AiOutlinePlus, AiOutlinePlusCircle } from 'react-icons/ai';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import clsx from 'clsx';

import { GiRollingDices } from 'react-icons/gi';
import { getRandomHexColor } from '@/utility/functions/misc/getRandomHexColor';
import { ADD_SERVICE } from '@/utility/queries/serviceQueries';

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

  const [businessUsers, setBusinessUsers] = useState<FormUser[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<Map<string, FormUser>>(new Map());

  useEffect(() => setAssignedUsers(new Map()), [selectedBusiness]);
  
  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 
  const { data: businessUsersData, loading: loadingBusinessUsers } = useQuery(GET_BUSINESS_USERS, { variables: { businessId: selectedBusiness?.id }, skip: !selectedBusiness}); 

  console.log(assignedUsers);

  useEffect(() => {
    if (!businessUsersData || loadingBusinessUsers) return;

    setBusinessUsers(businessUsersData.getBusiness.users.map((data: any) => data.user));
  }, [businessUsersData, loadingBusinessUsers]);

  useEffect(() => {
    if (userBusinessesData) {
      setBusinesses(userBusinessesData.getUserBusinesses);
    }
  }, [userBusinessesData]);

  const service = useMemo<ServiceInput | null>(() => {
    if (!selectedBusiness || !name || !duration || !cost || !color || !assignedUsers.size) return null;

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
      assigned_users: Array.from(assignedUsers.keys()),
    }
  }, [assignedUsers, color, cost, duration, isVideo, name, selectedBusiness]);

  const [addService, { 
    data: addServiceData, 
    loading: addServiceLoading, 
    error: addServiceError, 
    reset: addServiceReset 
  }] = useMutation(ADD_SERVICE, {
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

  const servicesList = useMemo(() => 
    businessUsers
      .map((u: FormUser) => (
        <div key={u.id} className={clsx(styles.option, styles.multipleOption, {[styles.multipleSelected]: assignedUsers.has(u.id)})} onClick={() => setAssignedUsers(p => {
          const map = new Map(p);
          return map.delete(u.id) ? map : map.set(u.id, u);
        })}>
          <Avatar src={u.avatar} size={28} />
          <p>{u.name}</p>
        </div>
      ))
  , [assignedUsers, businessUsers]);

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

        <p>Select Assignee(s)</p>
        <Select multiple list={servicesList} selected={(
          <div className={styles.assignees} style={{left: 0}}>
            {Array.from(assignedUsers.values()).map(user => 
              <div key={user.id}>
                <Avatar src={user.avatar} size={26} />
                <p>{user.name}</p>
              </div>
            )}
          </div>
        )} hasSelected={!!assignedUsers.size}/>

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
        <div className={styles.colorSelect}>
          <GiRollingDices fontSize={34} onClick={() => setColor(getRandomHexColor([234, 6])!)} />
          <Input type='color' placeholder='120' value={color} onChange={(e) => setColor(e.target.value)} style={{cursor: 'pointer'}} />
        </div>

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