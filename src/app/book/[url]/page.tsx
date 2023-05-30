'use client';

import { LoadingSplash } from '@/components/UI/LoadingSplash/LoadingSplash';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { useQuery } from '@apollo/client';
import { useMemo } from 'react';
import styles from './book.module.scss';

export default function Page({params}: { params: any }) {
  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});

  const loading = useMemo(() => loadingBookingSiteData, [loadingBookingSiteData]);
  if (loading) return (
    <div className={styles.background}>
      <LoadingSplash loading />
    </div>  
  );

  if(!bookingSiteData?.getBookingSite) return (
    <div className={styles.background}>
      <div className={styles.notfound}>
        <div className={styles.errorcode}>
          <hr />
          <p className={styles.fourohfour}>404</p>
          <hr />
        </div>
        <p>The booking page URL may have changed or no longer exists.</p>
      </div>
    </div>
  );

  return (
    <div className={styles.background}>

    </div>
  )
}