'use client';

import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import styles from './book.module.scss';
import Loading from './loading';
import { NotFound } from './notfound';

export default function Page({params}: { params: any }) {
  const [tab, setTab] = useState('Book');

  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});
  const loading = useMemo(() => loadingBookingSiteData, [loadingBookingSiteData]);

  if (loading) return <Loading />
  if(!bookingSiteData?.getBookingSite) return <NotFound />
  return (
    <div className={styles.background}>
      <div className={styles.header}>

      </div>
      <div className={styles.page}>
        <div className={clsx(styles.navigation, 'noselect')}>
          <p onClick={() => setTab('Book')} className={clsx({[styles.active]: tab === 'Book'})}>Book</p>
          <p onClick={() => setTab('Contact')} className={clsx({[styles.active]: tab === 'Contact'})}>Contact</p>
          <p onClick={() => setTab('About')} className={clsx({[styles.active]: tab === 'About'})}>About</p>
        </div>
        <div className={styles.form}>

        </div>
      </div>
    </div>
  )
}