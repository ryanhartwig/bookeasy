'use client';

import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { NewBusiness } from '@/types/Business';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { GET_BUSINESS } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import styles from './book.module.scss';
import Loading from './loading';
import { NotFound } from './notfound';

export default function Page({params}: { params: any }) {
  const [tab, setTab] = useState('Book');
  const [business, setBusiness] = useState<NewBusiness>();

  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});
  const { data: businessData, loading: loadingBusinessData } = useQuery(GET_BUSINESS, { variables: { businessId: bookingSiteData?.getBookingSite?.business_id }, skip: !bookingSiteData?.getBookingSite })
  useEffect(() => businessData && setBusiness(businessData.getBusiness), [businessData]);

  const loading = useMemo(() => loadingBookingSiteData || loadingBusinessData, [loadingBookingSiteData, loadingBusinessData]);

  if (loading) return <Loading />
  if(!bookingSiteData?.getBookingSite || !business) return <NotFound />
  return (
    <div className={styles.background}>
      <div className={styles.header}>

      </div>
      <div className={styles.page}>
        <div className={styles.title}>
          {business.avatar && <Avatar className={styles.businessPhoto} size={150} src={business.avatar} />}
          <h2 style={{marginLeft: business.avatar ? '150px' : ''}}>{business.name}</h2>
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