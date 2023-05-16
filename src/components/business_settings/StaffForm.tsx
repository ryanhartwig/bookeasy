import { Staff, StaffInput } from "@/types/User"
import { testEmail } from "@/utility/functions/validation/testEmail";
import { GET_BUSINESS_STAFF } from "@/utility/queries/businessQueries";
import { ADD_STAFF } from "@/utility/queries/staffQueries";
import { useMutation } from "@apollo/client";
import { useCallback, useEffect, useMemo, useState } from "react"
import uuid from "react-uuid";
import { Input } from "../UI/Input/Input";
import { Modal } from "../UI/Modal/Modal";
import styles from './staffForm.module.scss';

interface StaffFormProps {
  open: boolean,
  onClose: (...args: any) => any,
  initialStaff?: Staff,
  businessId: string,
}

export const StaffForm: React.FC<StaffFormProps> = ({open, onClose, initialStaff, businessId}) => {
  const [id, setId] = useState(uuid());
  const [name, setName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [contactPhone, setContactPhone] = useState('');

  // Error states
  const [nameError, setNameError] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  
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
      setNameError('Please enter a name.')
      valid = false;
    };
    if (contactEmail && !testEmail(contactEmail)) {
      setEmailError('Please enter a valid email or none.');
      valid = false;
    }
    return valid;
  }, [contactEmail, name]);

  const [addStaff] = useMutation(ADD_STAFF, {
    refetchQueries: [GET_BUSINESS_STAFF]
  });

  const onSubmit = useCallback(() => {
    const valid = checkInputs();
    if (!valid || !staff) return;

    ;(async () => {
      await addStaff({variables: { staff }});
      onClose();
    })()
    
  }, [addStaff, checkInputs, onClose, staff]);

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