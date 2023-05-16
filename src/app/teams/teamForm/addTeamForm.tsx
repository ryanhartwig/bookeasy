import { Input } from "@/components/UI/Input/Input";
import { Modal } from "@/components/UI/Modal/Modal"
import { NewBusiness } from "@/types/Business";
import React, { useCallback, useEffect, useMemo, useState } from "react"
import uuid from "react-uuid";
import styles from './addTeamForm.module.scss';
import { RiTeamLine } from 'react-icons/ri';
import { gql, useMutation } from "@apollo/client";
import { NEW_BUSINESS } from "@/utility/queries/businessQueries";
import { GET_USER_BUSINESSES_FRAGMENT } from "@/utility/queries/fragments/userFragments";
interface AddTeamFormProps {
  open: boolean,
  onClose: (...args: any) => void,
  setSelected: React.Dispatch<React.SetStateAction<NewBusiness | undefined>>,
  userId: string,
}

export const AddTeamForm: React.FC<AddTeamFormProps> = ({open, onClose, setSelected, userId}) => {
  const [name, setName] = useState<string>('');

  const [newBusiness, { data, loading, reset }] = useMutation(NEW_BUSINESS, {
    update(cache, { data: { newBusiness }}) {
      cache.modify({
        fields: {
          getUserBusinesses(existingBusinesses = [], { readField }) {
            const newBusinessRef = cache.writeFragment({
              data: newBusiness,
              fragment: gql`
                ${GET_USER_BUSINESSES_FRAGMENT}
              `
            }); 
            return [...existingBusinesses, newBusinessRef]
          }
        }
      })
    }
  });

  // Reset state
  useEffect(() => {
    if (!open) {
      setName('');
      reset();
    }
  }, [open, reset]);

  const onSubmit = useCallback(() => {
    newBusiness({ variables: {
      userId,
      name,
      is_own: false,
    }});
    setSelected(undefined);
  }, [newBusiness, userId, name, setSelected]);

  useEffect(() => {
    if (!data || loading) return;
    setSelected(data.newBusiness);
    onClose();
  }, [data, loading, onClose, setSelected]);

  return (
    <Modal open={open}
      onClose={onClose}
      actionButtonText="Confirm"
      actionButtonDisabled={!name}
      onAction={onSubmit}
      loading={loading}
    >
      <Modal.Header>Create a Team</Modal.Header>
      <div className={styles.addTeam}>
        <p>What would you like to name your team?</p>
        <Input autoFocus value={name} onChange={(e) => setName(e.target.value)} placeholder="Team / business name" required />
        <p>{`Don't worry, you can change this later.`}</p>
        <RiTeamLine className={styles.teamArt} />
      </div>
    </Modal>
  )
}