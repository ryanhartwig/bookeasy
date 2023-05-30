'use client';

import { Card } from '@/components/UI/Card/Card';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { GET_BUSINESS } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import styles from './book.module.scss';
import Loading from './loading';
import { NotFound } from './notfound';

export default function Page({params}: { params: any }) {
  const [tab, setTab] = useState('Book');

  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});
  const { data: businessData, loading: loadingBusinessData } = useQuery(GET_BUSINESS, { variables: { businessId: bookingSiteData?.getBookingSite?.business_id }, skip: !bookingSiteData?.getBookingSite })
  const loading = useMemo(() => loadingBookingSiteData, [loadingBookingSiteData]);

  if (loading) return <Loading />
  if(!bookingSiteData?.getBookingSite) return <NotFound />
  return (
    <div className={styles.background}>
      <div className={styles.header}>

      </div>
      <div className={styles.page}>
        <div className={styles.title}>
          <h2>{businessData?.getBusiness.name}</h2>
          <hr />
        </div>
        <div className={clsx(styles.navigation, 'noselect')}>
          <p onClick={() => setTab('Book')} className={clsx({[styles.active]: tab === 'Book'})}>Book</p>
          <p onClick={() => setTab('Contact')} className={clsx({[styles.active]: tab === 'Contact'})}>Contact</p>
          <p onClick={() => setTab('About')} className={clsx({[styles.active]: tab === 'About'})}>About</p>
        </div>
        <div className={styles.form}>
          <Card className={styles.formCard}>
            
          </Card>
        </div>
      </div>
    </div>
  )
}