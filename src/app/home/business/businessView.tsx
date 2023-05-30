'use client';

import { useUser } from "@/app/Providers";
import { GET_BUSINESS_WITH_STAFF_ID } from "@/utility/queries/businessQueries";
import { GET_USER } from "@/utility/queries/userQueries";
import { useQuery } from "@apollo/client";
import { Business } from "./business";
import Loading from "./loading";

export const BusinessView = () => {
  const { id } = useUser();
  const { data: userData } = useQuery(GET_USER, { variables: { userId: id }, skip: !id});
  const { data: businessData } = useQuery(GET_BUSINESS_WITH_STAFF_ID, { variables: { businessId: userData?.getUser?.business_id }, skip: !userData});

  return (
    <>
      {userData && businessData 
        ? <Business business={businessData.getBusiness} user={userData.getUser} staffId={businessData.getBusiness.staff[0].id} />
        : <Loading skipHeader />
      }
    </>
  )
}