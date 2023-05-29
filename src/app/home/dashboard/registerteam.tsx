'use client';

import { Modal } from "@/components/UI/Modal/Modal";
import { NewBusiness } from "@/types/Business";
import { GET_BUSINESS, NEW_BUSINESS_FRAGMENT } from "@/utility/queries/businessQueries";
import { ACCEPT_PENDING_REGISTRATION, DELETE_PENDING_REGISTRATION, GET_REGISTRATION_DETAILS } from "@/utility/queries/staffQueries";
import { gql, useMutation, useQuery } from "@apollo/client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import styles from './dashboard.module.scss';
import teamStyles from '../teams/teams.module.scss';


import { CiWarning } from 'react-icons/ci';
import { Avatar } from "@/components/UI/Avatar/Avatar";
import { Card } from "@/components/UI/Card/Card";
import clsx from "clsx";
import { TextButton } from "@/components/UI/TextButton/TextButton";
import { BsCheck2, BsXLg } from "react-icons/bs";
import { useUser } from "@/app/Providers";

export const RegisterTeam = () => {
  const params = useSearchParams();
  const router = useRouter();
  const { id: registeredUserId } = useUser();

  const [open, setOpen] = useState(false);
  const [regId, setRegId] = useState<string>();
  const [business, setBusiness] = useState<NewBusiness>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { data: registrationData, loading: loadingRegistrationData } = useQuery(GET_REGISTRATION_DETAILS, { variables: { pendingRegistrationId: regId }, skip: !regId });
  const { data: businessData, loading: loadingBusinessData } = useQuery(GET_BUSINESS, { variables: { businessId: registrationData?.getRegistrationDetails?.business_id }, skip: !registrationData?.getRegistrationDetails?.business_id });
  useEffect(() => businessData && setBusiness(businessData.getBusiness), [businessData]);

  // Handle notfound or expired errors
  useEffect(() => {
    if (!registrationData || !registrationData.getRegistrationDetails?.error) return;
    setError('The registration link is invalid or expired.');
  }, [loadingRegistrationData, registrationData]);

  useEffect(() => {
    const redirectId = params?.get('redirect_id');
    if (redirectId) {
      setOpen(true);
      setRegId(redirectId);
    }
  }, [params]);

  const [acceptPendingRegistration] = useMutation(ACCEPT_PENDING_REGISTRATION, {
    update(cache) {
      cache.modify({
        fields: {
          getUserBusinesses(existingBusinesses = []) {
            const newBusinessRef = cache.writeFragment({
              data: business,
              fragment: gql`
                ${NEW_BUSINESS_FRAGMENT}
              `
            });
            return [...existingBusinesses, newBusinessRef];
          }
        }
      })
    }
  });
  const [deletePendingRegistration] = useMutation(DELETE_PENDING_REGISTRATION);

  const onJoin = useCallback(() => {
    setLoading(true);

    ;(async() => {
      await acceptPendingRegistration({ variables: { registeredUserId, staffId: registrationData?.getRegistrationDetails?.staff_id }})
      await deletePendingRegistration({ variables: { id: regId }});
      setLoading(false);
      router.replace('/home/teams');
    })();
  }, [acceptPendingRegistration, deletePendingRegistration, regId, registeredUserId, registrationData, router]); 

  const onDecline = useCallback(() => {
    setLoading(true);

    ;(async() => {
      await deletePendingRegistration({ variables: { id: regId }});  
      setLoading(false);
      router.replace('/home/dashboard');
    })()
  }, [deletePendingRegistration, regId, router]);

  return (
    <>
      <Modal open={open}
        onClose={() => setOpen(false)}
        className={styles.invitationForm}
        loading={loadingRegistrationData || loadingBusinessData || loading}
      >
        <Modal.Header>Join a Team</Modal.Header>
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
              <TextButton onClick={onJoin} icon={<BsCheck2 fontSize={16} />} fontSize={15}>Accept</TextButton>
              <TextButton onClick={onDecline} altColor icon={<BsXLg fontSize={12} />} fontSize={15}>Decline</TextButton>
            </div>
          </div>
        )}
      </Modal>
    </>
  )
}