'use client';

import { Header } from '@/components/Header';
import { GET_BUSINESS_WITH_STAFF_ID } from '@/utility/queries/businessQueries';
import { GET_USER } from '@/utility/queries/userQueries';
import { userId } from '@/utility/sample_data/sample_userId';
import { useQuery } from '@apollo/client';
import { Business } from './business';

export default function Page() {

  const { data: userData } = useQuery(GET_USER, { variables: { userId } });
  const { data: businessData } = useQuery(GET_BUSINESS_WITH_STAFF_ID, { variables: { businessId: userData?.getUser?.own_business_id }, skip: !userData?.getUser});
  console.log(businessData);
  return (
    <>
      <Header text='My Business' />
      {userData && businessData && <Business business={businessData.getBusiness} user={userData.getUser} staffId={businessData.getBusiness.staff[0].id} />}
    </>
  )
}