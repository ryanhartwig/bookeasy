import { Modal } from "@/components/UI/Modal/Modal"
import { NewBusiness } from "@/types/Business";
import { useMemo, useState } from "react"
import uuid from "react-uuid";

interface AddTeamFormProps {
  open: boolean,
  onClose: (...args: any) => void,
}

export const AddTeamForm: React.FC<AddTeamFormProps> = ({open, onClose}) => {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [avatar, setAvatar] = useState<string | null>(null);

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
  }, [avatar, email, name, phone])

  return (
    <Modal open={open}
      onClose={onClose}
      actionButtonText="Confirm"
      actionButtonDisabled={!business}
    >
      <Modal.Header>Create a Team</Modal.Header>

    </Modal>
  )
}
