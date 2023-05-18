'use client';

import { Header } from '@/components/Header';
import { User } from '@/types/User';
import { GET_BUSINESS_WITH_STAFF_ID } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import { useSession } from 'next-auth/react';
import { Business } from './business';

export default function Page() {

  const { data: session } = useSession();
  const user = session?.user as User | undefined;

  const { data: businessData } = useQuery(GET_BUSINESS_WITH_STAFF_ID, { variables: { businessId: user?.own_business_id }, skip: !user});

  return (
    <>
      <Header text='My Business' />
      {user && businessData && <Business business={businessData.getBusiness} user={user} staffId={businessData.getBusiness.staff[0].id} />}
    </>
  );
}