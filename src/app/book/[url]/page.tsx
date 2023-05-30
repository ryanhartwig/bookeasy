'use client';

import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { NewBusiness } from '@/types/Business';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { GET_BUSINESS } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useEffect, useMemo, useState } from 'react';
import styles from './book.module.scss';
import { Confirm } from './forms/confirm';
import { SelectAgent } from './forms/selectAgent';
import { SelectService } from './forms/selectService';
import { SelectTime } from './forms/selectTime';
import Loading from './loading';
import { NotFound } from './notfound';

export default function Page({params}: { params: any }) {
  const [tab, setTab] = useState('Book');
  const [formTab, setFormTab] = useState(0);
  const tabs = useMemo(() => [
    <SelectService key="selectService" />,
    <SelectAgent key="selectAgent" />,
    <SelectTime key="selectTime" />,
    <Confirm key="confirm" />,
  ], []);
  
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
          {['Book', 'Contact', 'About'].map(label => 
            <p key={label} onClick={() => setTab(label)} className={clsx({[styles.current]: tab === label})}>{label}</p>
          )}
        </div>
        <div className={styles.form}>
          <Card className={styles.formCard}>
            <div className={styles.formProgress}>
              {['Select a Service', 'Select an Agent', 'Select a Time', 'Confirm Booking'].map((label, i) => 
                <>
                  <p key={label} className={clsx(styles.progressLabel, {[styles.current]: formTab === i})}>{label}</p>
                  {i !== 3 && <hr />}
                </>
              )}
            </div>
            <div className={styles.formShowing}>
              {tabs[formTab]}
            </div>
            <div className={clsx(styles.formNavigate, 'noselect')}>
              {!formTab ? <div /> : 
                <TextButton className={styles.back}
                  onClick={() => setFormTab(p => p - 1)}
                >
                  Go Back
                </TextButton>
              }
              {formTab === 3 ? <div /> :
                <TextButton
                  onClick={() => setFormTab(p => p + 1)}
                >
                  Continue
                </TextButton>
              }
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}