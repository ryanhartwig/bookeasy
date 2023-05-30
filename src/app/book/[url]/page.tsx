'use client';

import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { useQuery } from '@apollo/client';
import styles from './book.module.scss';

export default function Page({params}: { params: any }) {
  
  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});

  console.log(bookingSiteData?.getBookingSite);

  return (
    <div className={styles.book}>
      
    </div>
  )
}