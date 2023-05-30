'use client';

import { LoadingSplash } from '@/components/UI/LoadingSplash/LoadingSplash';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import styles from './book.module.scss';
import Loading from './loading';
import { NotFound } from './notfound';

export default function Page({params}: { params: any }) {
  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});

  const loading = useMemo(() => loadingBookingSiteData, [loadingBookingSiteData]);
  if (loading) return <Loading />
  if(!bookingSiteData?.getBookingSite) return <NotFound />

  return (
    <div className={styles.background}>

    </div>
  )
}