import { Staff, StaffInput } from "@/types/User"
import { isValidEmail } from "@/utility/functions/validation/isValidEmail";
import { GET_BUSINESS_STAFF } from "@/utility/queries/businessQueries";
import { ADD_PENDING_REGISTRATION, ADD_STAFF, DELETE_STAFF, EDIT_STAFF, STAFF_FRAGMENT } from "@/utility/queries/staffQueries";
import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react"
import { CiWarning } from "react-icons/ci";
import uuid from "react-uuid";
import { Avatar } from "../UI/Avatar/Avatar";
import { Button } from "../UI/Button/Button";
import { Input } from "../UI/Input/Input";
import { Modal } from "../UI/Modal/Modal";
import { TextButton } from "../UI/TextButton/TextButton";
import styles from './staffForm.module.scss';

import { VscLink } from "react-icons/vsc";
import { IoIosHelpCircleOutline } from "react-icons/io";

interface StaffFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  initialStaff?: Staff,
  businessId: string,
  businessName: string,
  setSelectedStaff?: React.Dispatch<React.SetStateAction<Staff | undefined>>,
}

export const StaffForm: React.FC<StaffFormProps> = ({open, onClose, businessName, initialStaff, businessId, setSelectedStaff}) => {
  const [id, setId] = useState(uuid());
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<boolean>(false);
  const [elevated, setElevated] = useState(false);

  const [registerEmail, setRegisterEmail] = useState<string>('');

  // Error states
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [registerEmailError, setRegisterEmailError] = useState<string>('');


  // Prepopulate initialStaff fields when provided
  useEffect(() => {
    if (!initialStaff) return;

    setId(initialStaff.id);
    setName(initialStaff.name);
    setContactEmail(initialStaff.contact_email || '');
    setContactPhone(initialStaff.contact_phone || '');
  }, [initialStaff]);
  
  const staff = useMemo<StaffInput | undefined>(() => {
    if (!name) return;
    return {
      id,
      name,
      business_id: businessId,
      contact_email: contactEmail || null,
      contact_phone: contactPhone || null, 
    }
  }, [businessId, contactEmail, contactPhone, id, name]);

  const checkInputs = useCallback(() => {
    let valid = true;
    if (!name) {
      setNameError('Please enter a name')
      valid = false;
    };
    if (contactEmail && !isValidEmail(contactEmail)) {
      setEmailError('Please enter a valid email or none');
      valid = false;
    }
    return valid;
  }, [contactEmail, name]);

  const [addStaff] = useMutation(ADD_STAFF, { refetchQueries: [GET_BUSINESS_STAFF] });
  const [editStaff] = useMutation(EDIT_STAFF, { refetchQueries: [GET_BUSINESS_STAFF] });
  const [deleteStaff, { loading: deleteStaffLoading, data: deleteStaffData, reset: deleteStaffReset }] = useMutation(DELETE_STAFF, {
    refetchQueries: [GET_BUSINESS_STAFF]
  });

  const [addPendingRegistration, { loading: loadingPendingReg }] = useMutation(ADD_PENDING_REGISTRATION, { refetchQueries: [GET_BUSINESS_STAFF] });

  const onSubmit = useCallback(() => {
    const valid = checkInputs();
    if (!valid || !staff) return;

    ;(async () => {
      const response = initialStaff
        ? await editStaff({variables: { staff }})
        : await addStaff({variables: { staff }});

      initialStaff && setSelectedStaff && setSelectedStaff(response.data.editStaff);
      onClose();
    })();
    
  }, [addStaff, checkInputs, editStaff, initialStaff, onClose, setSelectedStaff, staff]);

  const onDeleteStaff = useCallback(() => {
    ;(async () => {
      await deleteStaff({ variables: { staffId: initialStaff!.id } });
      setSelectedStaff && setSelectedStaff(undefined);
      deleteStaffReset();
      setConfirmDelete(false);''
      onClose();
    })();
  }, [deleteStaff, deleteStaffReset, initialStaff, onClose, setSelectedStaff]);

  const onRegister = useCallback(() => {
    if (!registerEmail || !isValidEmail(registerEmail)) {
      setRegisterEmailError('Please enter a valid email address');
      return;
    }
    
    ;(async () => {
      await addPendingRegistration({ variables: { email: registerEmail, staffId: id, elevated, teamName: businessName, businessId }});
    })();
  }, [addPendingRegistration, businessId, businessName, elevated, id, registerEmail]);

  return (
    <Modal open={open}
      onClose={onClose}
      actionButtonText="Confirm"
      actionButtonDisabled={!staff}
      className={styles.staffForm}
      onClickDisabledAction={checkInputs}
      onAction={onSubmit}
      loading={deleteStaffLoading}
    >
      <Modal.Header>{initialStaff ? "Edit" : "Add"} Staff Member</Modal.Header>
      <div className={styles.input}>
        <label htmlFor="staffname">Staff Name</label>
        <Input id='staffname' autoComplete="off" value={name} onChange={(e) => {
          setNameError('');
          setName(e.target.value);
        }} required autoFocus placeholder="John Doe" errorMessage={nameError} errorOnFocusOnly />
      </div>
      <div className={styles.input}>
        <label htmlFor="staffemail">Client Contact Email</label>
        <Input id='staffemail' autoComplete="off" value={contactEmail} onChange={(e) => {
          setEmailError('');
          setContactEmail(e.target.value);
        }} placeholder="john@example.com" errorMessage={emailError} />
      </div>
      <div className={styles.input}>
        <label htmlFor="staffphone">Client Contact Phone</label>
        <Input id='staffphone' autoComplete="off" value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="(123) 456-7890" />
      </div>

      <hr />
      <div className={styles.heading}>
        <h2>Register User</h2>
        <div className={styles.helpIcon} tabIndex={0}>
          <IoIosHelpCircleOutline fontSize={16}  />
          <div className={styles.helpTip}>
            <p>Invite a Bookeasy user to join your team as this staff member. They will be prompted to create an account or use an existing one.</p>
          </div>
        </div>
      </div>

      {/* Invite new user */}
      <div className={styles.input}>
        <label htmlFor="registerEmail">Recipient Email</label>
        <Input id='registerEmail' 
          value={registerEmail} 
          errorMessage={registerEmailError}
          errorOnFocusOnly
          type={'email'}
          autoComplete={"off"}
          disabled={loadingPendingReg}
          onChange={(e) => {
            setRegisterEmail(e.target.value);
            setRegisterEmailError('');
          }} 
          placeholder="user@example.com" 
        />
        <div className={styles.makeAdmin}>
          <label htmlFor="elevated">Make admin?</label>
          <Input type={"checkbox"} 
            id="elevated" 
            style={{height: 12, width: 12}} 
            checked={elevated} 
            onChange={() => setElevated(p => !p)} 
          />
          <div className={styles.helpIcon} tabIndex={0}>
            <IoIosHelpCircleOutline fontSize={16}  />
            <div className={styles.helpTip}>
              <p>Admin users can invite / create new team members, clients, services and edit details about the business. Only the business creator can delete the business.</p>
            </div>
          </div>
        </div>
        {initialStaff && <Button className={styles.registerButton} 
          onClick={onRegister}
          loading={loadingPendingReg}
          icon={<VscLink className={styles.registerButtonIcon} />} 
        >Send Invitation</Button>}
      </div>
      

      {initialStaff && <div className={styles.input}>
        <TextButton altColor onClick={() => setConfirmDelete(true)}>Remove Staff Member</TextButton>
      </div>}
      {initialStaff && <>
        <Modal 
          actionCloses 
          open={confirmDelete} 
          onClose={() => setConfirmDelete(false)} 
          actionButtonText="Delete" 
          onAction={onDeleteStaff} 
        >
          <Modal.Header>Remove Staff Member</Modal.Header>
          <div className={styles.confirmDelete}>
            <div className={styles.warning}>
              <CiWarning />
              <p>This action cannot be undone.</p>
            </div>
            <div className={styles.staff}>
              <div>
                <Avatar src={initialStaff.avatar} size={28} />
              </div>
              <div>
                <p>{initialStaff.name}</p>
                <p>{new Date(initialStaff.date_added).toLocaleDateString()}</p>
              </div>
            </div> 
            <p className={styles.staffDeleteMessage}>Any scheduled appointments with this staff member will be deleted.</p>
          </div>
        </Modal>
      </>}
    </Modal>
  )
}