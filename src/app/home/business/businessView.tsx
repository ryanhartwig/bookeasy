'use client';

import { useUser } from "@/app/Providers";
import { Spinner } from "@/components/UI/Spinner/Spinner";
import { GET_BUSINESS_WITH_STAFF_ID, NEW_BUSINESS } from "@/utility/queries/businessQueries";
import { GET_USER, PATCH_USER } from "@/utility/queries/userQueries";
import { useMutation, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { Business } from "./business";
import Loading from "./loading";

export const BusinessView = () => {
  const { id } = useUser();
  const { data: userData, loading: loadingUserData } = useQuery(GET_USER, { variables: { userId: id }});
  const { data: businessData } = useQuery(GET_BUSINESS_WITH_STAFF_ID, { variables: { businessId: userData?.getUser?.business_id }, skip: !userData?.getUser?.business_id});

  const [createBusiness] = useMutation(NEW_BUSINESS);
  const [patchUser] = useMutation(PATCH_USER, { refetchQueries: [ GET_USER ]});
  useEffect(() => {
    if (loadingUserData || userData?.getUser?.business_id) return;

    ;(async () => {
      const { data: businessData } = await createBusiness({ variables: { name: userData.getUser.name, userId: userData.getUser.id }});
      await patchUser({ variables: { userId: id, patch: { business_id: businessData.newBusiness.id }}})
    })();
  }, [createBusiness, id, loadingUserData, patchUser, userData]);

  if (loadingUserData) return <Spinner style={{margin: 20}} />
  return (
    <>
      {businessData
        ? <Business business={businessData.getBusiness} user={userData.getUser} staffId={businessData.getBusiness.staff[0].id} />
        : <Loading skipHeader />
      }
    </>
  )
}