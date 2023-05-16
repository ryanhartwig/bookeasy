import { Staff } from "@/types/User"
import { testEmail } from "@/utility/functions/validation/testEmail";
import { useCallback, useMemo, useState } from "react"
import uuid from "react-uuid";
import { Input } from "../UI/Input/Input";
import { Modal } from "../UI/Modal/Modal";
import styles from './staffForm.module.scss';

interface StaffFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  initialStaff?: Staff,
}

export const StaffForm: React.FC<StaffFormProps> = ({open, onClose, initialStaff}) => {

  const [id, setId] = useState(uuid());
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Error states
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  
  const staff = useMemo<Staff | undefined>(() => {
    if (!name) return;

    return {
      id,
      name,
      contact_email: contactEmail || null,
      contact_phone: contactPhone || null, 
      date_added: new Date().toISOString(),
      elevated: false,
      registered_user_id: null,
    }
  }, [contactEmail, contactPhone, id, name]);

  const checkInputs = useCallback(() => {
    if (!name) setNameError('Please enter a name.');
    if (contactEmail && !testEmail(contactEmail)) setEmailError('Please enter a valid email or none.');
  }, [contactEmail, name]);

  const onSubmit = useCallback(() => {
    checkInputs();
    if (nameError || emailError) return;
  }, [checkInputs, emailError, nameError]);

  return (
    <Modal open={open}
      onClose={onClose}
      actionButtonText="Confirm"
      actionButtonDisabled={!staff}
      className={styles.staffForm}
      onClickDisabledAction={checkInputs}
      onAction={onSubmit}
    >
      <Modal.Header>{initialStaff ? "Edit" : "Add"} Staff Member</Modal.Header>
      <div className={styles.input}>
        <label htmlFor="staffname">Staff Name</label>
        <Input id='staffname' value={name} onChange={(e) => {
          setNameError('');
          setName(e.target.value);
        }} required autoFocus placeholder="John Doe" errorMessage={nameError} />
      </div>
      <div className={styles.input}>
        <label htmlFor="staffemail">Client Contact Email</label>
        <Input id='staffemail' value={contactEmail} onChange={(e) => {
          setEmailError('');
          setContactEmail(e.target.value);
        }} placeholder="john@example.com" errorMessage={emailError} />
      </div>
      <div className={styles.input}>
        <label htmlFor="staffphone">Client Contact Phone</label>
        <Input id='staffphone' value={contactPhone} onChange={(e) => setContactPhone(e.target.value)} placeholder="(123) 456-7890" />
      </div>
    </Modal>
  )
}