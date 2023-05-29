'use client';

import { Modal } from "@/components/UI/Modal/Modal";
import { NewBusiness } from "@/types/Business";
import { GET_BUSINESS } from "@/utility/queries/businessQueries";
import { GET_REGISTRATION_DETAILS } from "@/utility/queries/staffQueries";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styles from './dashboard.module.scss';
import teamStyles from '../teams/teams.module.scss';


import { CiWarning } from 'react-icons/ci';
import { Avatar } from "@/components/UI/Avatar/Avatar";
import { Card } from "@/components/UI/Card/Card";
import clsx from "clsx";
import { TextButton } from "@/components/UI/TextButton/TextButton";

export const RegisterTeam = () => {
  const params = useSearchParams();

  const [open, setOpen] = useState(false);
  const [regId, setRegId] = useState<string>();
  const [business, setBusiness] = useState<NewBusiness>();
  const [error, setError] = useState('');

  const { data: registrationData, loading } = useQuery(GET_REGISTRATION_DETAILS, { variables: { pendingRegistrationId: regId }, skip: !regId });
  const { data: businessData, loading: loadingBusinessData } = useQuery(GET_BUSINESS, { variables: { businessId: registrationData?.getRegistrationDetails?.business_id }, skip: !registrationData?.getRegistrationDetails?.business_id });
  useEffect(() => businessData && setBusiness(businessData.getBusiness), [businessData]);

  // Handle notfound or expired errors
  useEffect(() => {
    if (!registrationData || !registrationData.getRegistrationDetails?.error) return;
    setError('The registration link is invalid or expired.');
  }, [registrationData]);

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
        loading={loading || loadingBusinessData}
      >
        <Modal.Header>{"You're"} invited!</Modal.Header>
        {error ? <div className={styles.invalidLink}>
          <CiWarning style={{marginRight: 5}} />
          <p>{error}</p>
        </div>
        : business && (
          <div className={styles.invitation}>
            <p>You have been invited to join {business.name}!</p>
            <Card key={business.id} 
              className={clsx(teamStyles.team, {[teamStyles.selected]: true})}
              style={{pointerEvents: 'none'}}
            >
              <p>{business.name}</p>
              <Avatar src={business.avatar} size={70} useTeamIcon />
            </Card>
            <hr />
            <div className={styles.invitationActions}>
              <TextButton fontSize={15}>Accept</TextButton>
              <TextButton fontSize={15}>Decline</TextButton>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}