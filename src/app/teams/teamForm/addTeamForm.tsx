import { Input } from "@/components/UI/Input/Input";
import { Modal } from "@/components/UI/Modal/Modal"
import { NewBusiness } from "@/types/Business";
import { testEmail } from "@/utility/functions/validation/testEmail";
import { useCallback, useEffect, useMemo, useState } from "react"
import uuid from "react-uuid";
import styles from './addTeamForm.module.scss';

interface AddTeamFormProps {
  open: boolean,
  onClose: (...args: any) => void,
}

export const AddTeamForm: React.FC<AddTeamFormProps> = ({open, onClose}) => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);

  const [emailError, setEmailError] = useState<string>('');
  useEffect(() => setEmailError(''), [email]);

  const business = useMemo<NewBusiness | null>(() => {
    if (!name) return null;
    
    return {
      id: uuid(),
      name,
      email,
      phone,
      avatar,
      max_book_ahead: null,
      min_booking_notice: null,
      min_cancel_notice: null,
      user_id: null,
      created: new Date().toISOString(),
    }
  }, [avatar, email, name, phone]);

  const onSubmit = useCallback(() => {
    if (email && !testEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
  } ,[email]);

  // Reset state
  useEffect(() => {
    if (!open) {
      setName('');
      setEmail('');
      setPhone('');
      setAvatar(null);
    }
  }, [open]);

  return (
    <Modal open={open}
      onClose={onClose}
      actionButtonText="Confirm"
      actionButtonDisabled={!business}
      onAction={onSubmit}
    >
      <Modal.Header>Create a Team</Modal.Header>
      <div className={styles.addTeam}>
        <p>What would you like to name your team?</p>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
        <p>{`Don't worry, you can change this later.`}</p>
      </div>
    </Modal>
  )
}
