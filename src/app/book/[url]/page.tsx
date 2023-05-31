'use client';

import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { Spinner } from '@/components/UI/Spinner/Spinner';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { NewBusiness } from '@/types/Business';
import { Service } from '@/types/Service';
import { Staff } from '@/types/User';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { GET_BUSINESS, GET_BUSINESS_SERVICES, GET_BUSINESS_STAFF } from '@/utility/queries/businessQueries';
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

interface SelectedState {
  service: Service | null,
  staff: Staff | null,
  time: any,
}

export default function Page({params}: { params: any }) {
  const [tab, setTab] = useState('Book');
  const [formTab, setFormTab] = useState(0);
  const [business, setBusiness] = useState<NewBusiness>();
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);

  const [selected, setSelected] = useState<SelectedState>({
    service: null,
    staff: null,
    time: null,
  });
  useEffect(() => { selected.service && setFormTab(p => p + 1) }, [selected.service]);
  useEffect(() => { selected.staff && setFormTab(p => p + 1) }, [selected.staff]);

  // Booking site & business data if available
  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});
  const { data: businessData, loading: loadingBusinessData } = useQuery(GET_BUSINESS, { variables: { businessId: bookingSiteData?.getBookingSite?.business_id }, skip: !bookingSiteData?.getBookingSite })
  useEffect(() => businessData && setBusiness(businessData.getBusiness), [businessData]);

  // Form data
  const { data: servicesData, loading: loadingServicesData} = useQuery(GET_BUSINESS_SERVICES, { variables: { businessId: business?.id }, skip: !business });
  useEffect(() => servicesData && setServices(servicesData.getBusinessServices), [businessData, servicesData]);
  const { data: staffData, loading: loadingStaffData} = useQuery(GET_BUSINESS_STAFF, { variables: { businessId: business?.id }, skip: !business });
  useEffect(() => staffData && setStaff(staffData.getBusiness.staff), [staffData]);

  const initialLoading = useMemo(() => loadingBookingSiteData || loadingBusinessData, [loadingBookingSiteData, loadingBusinessData]);
  const businessDataLoading = useMemo(() => loadingServicesData || loadingStaffData, [loadingServicesData, loadingStaffData]);

  const tabs = useMemo(() => {
    if (!business) return [];
    return [
    <SelectService key="selectService" services={services} setSelected={setSelected} />,
    <SelectAgent key="selectAgent" setSelected={setSelected} businessId={business.id} staff={staff.filter(s => selected?.service?.assigned_staff.find(staff => staff.id === s.id))} />,
    <SelectTime key="selectTime" business={business} selectedStaff={selected.staff} />,
    <Confirm key="confirm" />,
  ]}, [business, selected?.service?.assigned_staff, selected.staff, services, staff]);

  if (initialLoading) return <Loading />
  if(!bookingSiteData?.getBookingSite || !business) return <NotFound />
  return (
    <div className={styles.background}>
      <div className={styles.header} />
      <div className={styles.page}>
        <div className={styles.title}>
          {business.avatar && <Avatar className={styles.businessPhoto} size={170} src={business.avatar} />}
          <h2 style={{marginLeft: business.avatar ? '170px' : ''}}>{business.name}</h2>
          <hr />
        </div>
        <div className={clsx(styles.navigation, 'noselect')}>
          {['Book', 'Staff', 'Contact', 'About'].map(label => 
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
              {businessDataLoading ? <Spinner style={{margin: 30}} /> :  tabs[formTab]}
            </div>
            <div className={clsx(styles.formNavigate, 'noselect')}>
              {!formTab || businessDataLoading ? <div /> : 
                <TextButton className={styles.back}
                  onClick={() => {
                    setSelected(p => ({
                      ...p,
                      [Object.keys(p)[formTab - 1]]: null,
                    }))
                    setFormTab(p => p - 1);
                  }}
                >
                  Go Back
                </TextButton>
              }
              {/* {formTab === 3 || businessDataLoading ? <div /> :
                <TextButton
                  onClick={() => setFormTab(p => p + 1)}
                >
                  Continue
                </TextButton>
              } */}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}