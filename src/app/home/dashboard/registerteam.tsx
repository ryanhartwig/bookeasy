'use client';

import { Modal } from "@/components/UI/Modal/Modal";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './dashboard.module.scss';

export const RegisterTeam = () => {
  const [open, setOpen] = useState(false);
  const [regId, setRegId] = useState<string>();

  const params = useSearchParams();

  
  useEffect(() => {
    const redirectId = params?.get('redirect_id');
    if (redirectId) {
      setOpen(true);
      setRegId(redirectId);
    }
  }, [params]);

  return (
    <>
      <Modal open={open}
        onClose={() => setOpen(false)}
        className={styles.invitationForm}
      >
        <Modal.Header>{"You're"} invited!</Modal.Header>

      </Modal>
    </>
  )
}