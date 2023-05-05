'use client';

import { Header } from '@/components/Header';
import { GET_USER, GET_USER_OWN_BUSINESS } from '@/utility/queries/userQueries';
import { userId } from '@/utility/sample_data/sample_userId';
import { useQuery } from '@apollo/client';
import { Business } from './business';

export default function Page() {

  const { data: userData } = useQuery(GET_USER, { variables: { userId } });
  const { data: userBusinessData } = useQuery(GET_USER_OWN_BUSINESS, { variables: { userId }});
  
  return (
    <>
      <Header text='My Business' />
      {userData && userBusinessData && <Business business={userBusinessData.getUserOwnBusiness} user={userData.getUser} />}
    </>
  )
}