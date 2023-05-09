import { Input } from "@/components/UI/Input/Input";
import { Modal } from "@/components/UI/Modal/Modal"
import { NewBusiness } from "@/types/Business";
import { useCallback, useEffect, useMemo, useState } from "react"
import uuid from "react-uuid";
import styles from './addTeamForm.module.scss';
import { RiTeamLine } from 'react-icons/ri';
interface AddTeamFormProps {
  open: boolean,
  onClose: (...args: any) => void,
}

export const AddTeamForm: React.FC<AddTeamFormProps> = ({open, onClose}) => {

  const [name, setName] = useState<string>('');

  const business = useMemo<NewBusiness | null>(() => {
    if (!name) return null;
    
    return {
      id: uuid(),
      name,
      email: '',
      phone: '',
      avatar: '',
      max_book_ahead: null,
      min_booking_notice: null,
      min_cancel_notice: null,
      user_id: null,
      created: new Date().toISOString(),
    }
  }, [name]);

  // Reset state
  useEffect(() => {
    if (!open) {
      setName('');
    }
  }, [open]);

  const onSubmit = useCallback(() => {

  }, []);

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
        <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Team / business name" required />
        <p>{`Don't worry, you can change this later.`}</p>
        <RiTeamLine className={styles.teamArt} />
      </div>
    </Modal>
  )
}
