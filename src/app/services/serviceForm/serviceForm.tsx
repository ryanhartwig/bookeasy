import styles from './serviceForm.module.scss';
import uuid from "react-uuid"

import { Modal } from "@/components/UI/Modal/Modal"
import { Select } from "@/components/UI/Select/Select"
import { FormBusiness, NewBusiness } from "@/types/Business"
import { useCallback, useEffect, useMemo, useState } from "react"
import { useMutation, useQuery } from "@apollo/client"
import { GET_USER_BUSINESSES } from "@/utility/queries/userQueries"
import { GET_BUSINESS_SERVICES, GET_BUSINESS_USERS } from "@/utility/queries/businessQueries"
import { Service, ServiceInput } from '@/types/Service';
import { Input } from '@/components/UI/Input/Input';
import { AssignedUser } from '@/types/User';
import { AiOutlineCheck, AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import clsx from 'clsx';

import { GiRollingDices } from 'react-icons/gi';
import { getRandomHexColor } from '@/utility/functions/misc/getRandomHexColor';
import { ADD_SERVICE, DELETE_SERVICE, EDIT_SERVICE } from '@/utility/queries/serviceQueries';
import { BsTrash3 } from 'react-icons/bs';
import { dateToDateInput } from '@/utility/functions/conversions/dateToDateInput';
import { dateInputToDate } from '@/utility/functions/conversions/dateInputToDate';

interface ServiceFormProps {
  open: boolean,
  setOpen: React.Dispatch<React.SetStateAction<boolean>>,  
  userId: string,
  onSubmit?: (...args: any) => any,
  initialService?: Service,
}

export const ServiceForm: React.FC<ServiceFormProps> = ({open, setOpen, userId, onSubmit, initialService}) => {
  const [selectedBusiness, setSelectedBusiness] = useState<FormBusiness>();
  const [error, setError] = useState<string>();
  const [name, setName] = useState<string>('');
  const [duration, setDuration] = useState<number>(30);
  const [cost, setCost] = useState<string>('');
  const [isVideo, setIsVideo] = useState<boolean>(false);
  const [color, setColor] = useState<string>('#1934b8');
  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [businessUsers, setBusinessUsers] = useState<AssignedUser[]>([]);
  const [assignedUsers, setAssignedUsers] = useState<Map<string, AssignedUser>>(new Map());

  const minimumDateInput = useMemo(() => dateToDateInput(), []);
  
  const [costUpdate, setCostUpdate] = useState<boolean>(false);
  const [costUpdateDate, setCostUpdateDate] = useState<string>(minimumDateInput);

  const [durationUpdate, setDurationUpdate] = useState<boolean>(false);
  const [durationUpdateDate, setDurationUpdateDate] = useState<string>(minimumDateInput);
  

  useEffect(() => setAssignedUsers(new Map()), [selectedBusiness]);
  
  const { data: userBusinessesData, loading: loadingUserBusinesses } = useQuery(GET_USER_BUSINESSES, { variables: { userId }}); 
  const { data: businessUsersData, loading: loadingBusinessUsers } = useQuery(GET_BUSINESS_USERS, { variables: { businessId: selectedBusiness?.id }, skip: !selectedBusiness}); 

  useEffect(() => {
    if (!businessUsersData || loadingBusinessUsers) return;

    setBusinessUsers(businessUsersData.getBusiness.users.map((data: any) => data.user));
  }, [businessUsersData, loadingBusinessUsers]);

  useEffect(() => {
    if (userBusinessesData) {
      setBusinesses(userBusinessesData.getUserBusinesses);
    }
  }, [userBusinessesData]);

  // Prepopulate if editing
  useEffect(() => {
    if (!initialService) return;
    if (!businesses.length || !userBusinessesData) return;

    setSelectedBusiness(businesses.find(b => b.id === initialService.business_id));
    setName(initialService.name);
    setDuration(initialService.duration);
    setCost(initialService.cost.toFixed(2).toString());
    setIsVideo(initialService.is_video);
    setColor(initialService.color);

    const assignedUsersMap = new Map<string, AssignedUser>();
    initialService.assigned_users.forEach(u => assignedUsersMap.set(u.id, u));

    setAssignedUsers(assignedUsersMap);
        
  }, [businessUsers.length, businesses, initialService, userBusinessesData]);

  const service = useMemo<ServiceInput | null>(() => {
    if (!selectedBusiness || !name || !duration || !cost || !color || !assignedUsers.size) return null;

    return {
      id: initialService?.id || uuid(),
      business_id: selectedBusiness.id,
      name,
      duration,
      provider: selectedBusiness.name,
      cost: Number(cost), 
      is_video: isVideo,
      color,
      deleted: false,
      assigned_users: Array.from(assignedUsers.keys()),
      cost_start: costUpdate ? dateInputToDate(costUpdateDate).toISOString() : undefined,
      duration_start: durationUpdate ? dateInputToDate(durationUpdateDate).toISOString() : undefined,
    }
  }, [assignedUsers, color, cost, costUpdate, costUpdateDate, duration, durationUpdate, durationUpdateDate, initialService?.id, isVideo, name, selectedBusiness]);

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

  const [editService, { 
    data: editServiceData, 
    loading: editServiceLoading, 
    error: editServiceError, 
    reset: editServiceReset 
  }] = useMutation(EDIT_SERVICE, {
    refetchQueries: [{
      query: GET_BUSINESS_SERVICES,
      variables: { businessId: selectedBusiness?.id }
    }],
  });

  const [deleteService, { 
    loading: deleteServiceLoading, 
    reset: deleteServiceReset 
  }] = useMutation(DELETE_SERVICE, {
    refetchQueries: [{
      query: GET_BUSINESS_SERVICES,
      variables: { businessId: selectedBusiness?.id  }
    }],
  });

  const reset = useCallback(() => {
    addServiceReset();
    editServiceReset();
    deleteServiceReset();
    onSubmit && onSubmit();
    setOpen(false);
  }, [addServiceReset, deleteServiceReset, editServiceReset, onSubmit, setOpen]);

  useEffect(() => {
    if (addServiceLoading || !addServiceData) return;
    if (addServiceError) {
      return setError('Something went wrong'); // fallback
    }
    reset();
  }, [addServiceData, addServiceError, addServiceLoading, addServiceReset, editServiceError, editServiceLoading, editServiceReset, onSubmit, reset, setOpen]);
  useEffect(() => {
    if (editServiceLoading || !editServiceData) return;
    if (editServiceError) {
      return setError('Something went wrong'); // fallback
    }
    reset();
  }, [editServiceData, editServiceError, editServiceLoading, reset]);

  const onSubmitForm = useCallback(() => {
    if (!service) return;
    if (initialService) {
      editService({variables: { service }});
    } else {
      addService({variables: { service }});
    }
  }, [addService, editService, initialService, service]);

  const onDeleteService = useCallback(() => {
    deleteService({variables: { serviceId: initialService?.id }});
    reset();
  }, [deleteService, initialService?.id, reset]);

  const businessesList = useMemo(() => businesses.map(b => (
    <div key={b.id} className={styles.option} onClick={() => {setSelectedBusiness(b)}}>
      <p>{b.name}</p>
    </div>
  )), [businesses]);

  const clientList = useMemo(() => 
    businessUsers
      .map((u: AssignedUser) => (
        <div key={u.id} className={clsx(styles.option, styles.multipleOption, {[styles.multipleSelected]: assignedUsers.has(u.id)})} onClick={() => setAssignedUsers(p => {
          const map = new Map(p);
          return map.delete(u.id) ? map : map.set(u.id, u);
        })}>
          <Avatar src={u.avatar} size={28} />
          <p>{u.name}</p>
          <AiOutlineCheck className={styles.checked} />
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
      actionCloses
      loading={addServiceLoading || loadingUserBusinesses || loadingBusinessUsers || editServiceLoading || deleteServiceLoading}
    >
      <Modal.Header>{initialService ? 'Edit' : 'Add a'} Service</Modal.Header>
      <div className={styles.appointmentOptions}>
        {!initialService && <>
          <p>Select a provider</p>
          <Select list={businessesList} selected={(
            <div className={styles.selectedOption}>
              <p>{selectedBusiness?.name}</p>
            </div>
          )} hasSelected={!!selectedBusiness}/> 
        </>}

        <p>Select Assignee(s)</p>
        <Select multiple list={clientList} selected={(
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
        <div className={styles.cost}>
          <p>$</p>
          <Input style={{paddingLeft: 25}} type='text' placeholder='120.00' value={cost} onChange={(e) => isNaN(Number(e.target.value)) ? undefined : setCost(e.target.value)} onBlur={() => setCost(p => Number(p).toFixed(2).toString())} />
        </div>
        {initialService && Number(cost) !== initialService.cost && (
          <div className={styles.updateAppointment}>
            <div className={styles.checkboxLabel}>
              <Input id='updateprice' type='checkbox' checked={costUpdate} onChange={(e) => setCostUpdate(e.target.checked)} style={{height: 12, width: 12}} />  
              <label htmlFor='updateprice'>Update price on booked appointments?</label>
            </div>
            {costUpdate && <div className={styles.dateSelect}>
              <p>Starting: </p>
              <Input  type='date' value={costUpdateDate} onChange={(e) => setCostUpdateDate(() => e.target.value < minimumDateInput ? minimumDateInput : e.target.value)} />
            </div>}
            
          </div>
        )}

        <p>Duration</p>
        <div className={styles.durationSelect}>
          <AiOutlineMinusCircle onClick={() => setDuration(p => p === 15 ? p : p - 15)} />
          <p>{duration > 45 && `${Math.floor(duration / 60)} hr${Math.floor(duration / 60) > 1 ? 's' : ''}`} {duration % 60} mins</p>
          <AiOutlinePlusCircle onClick={() => setDuration(p => p === 720 ? p : p + 15)} />
        </div>
        {initialService && duration !== initialService.duration && (
          <div className={styles.updateAppointment}>
            <div className={styles.checkboxLabel}>
              <Input id='updateduration' type='checkbox' checked={durationUpdate} onChange={(e) => setDurationUpdate(e.target.checked)} style={{height: 12, width: 12}} />  
              <label htmlFor='updateduration'>Update duration on booked appointments?</label>
            </div>
            {durationUpdate && <div className={styles.dateSelect}>
              <p>Starting: </p>
              <Input type='date' value={durationUpdateDate} onChange={(e) => setDurationUpdateDate(() => e.target.value < minimumDateInput ? minimumDateInput : e.target.value)} />
              {duration > initialService.duration && <p className={styles.warning}>Warning: This may cause overlapping</p>}
            </div>}
            
          </div>
        )}

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
      {!!initialService && <div className={styles.delete} onClick={() => setConfirmDelete(true)}>
        <BsTrash3 />
        <p>Remove</p>
      </div>}
      <Modal open={confirmDelete} onClose={() => setConfirmDelete(false)} actionButtonText="Confirm" onAction={() => {setConfirmDelete(false); onDeleteService()}} actionCloses >
        <Modal.Header>Confirm Delete</Modal.Header>
        <div className={styles.confirmDelete}>
          <p>Are you sure you want to remove this service?</p>
          <p>Note: appointment data will not change</p>
        </div>
      </Modal>
    </Modal>
  )
}