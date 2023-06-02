'use client';

import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { Modal } from '@/components/UI/Modal/Modal';
import { Spinner } from '@/components/UI/Spinner/Spinner';
import { TextButton } from '@/components/UI/TextButton/TextButton';
import { NewBusiness } from '@/types/Business';
import { Service } from '@/types/Service';
import { Staff } from '@/types/User';
import { getDateTimeStringFull } from '@/utility/functions/conversions/getDateTimeString';
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
import formStyles from './forms/forms.module.scss';

export interface SelectedState {
  service: Service | null,
  staff: Staff | null,
  startDate: Date | null,
}
export interface Details {
  service: Service,
  staff: Staff,
  startDate: Date,
}

export default function Page({params}: { params: any }) {
  const [tab, setTab] = useState('Book');
  const [formTab, setFormTab] = useState(0);
  const [business, setBusiness] = useState<NewBusiness>();
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  
  const [successDetails, setSuccessDetails] = useState<Details | null>(null);
  const [selected, setSelected] = useState<SelectedState>({
    service: null,
    staff: null,
    startDate: null,
  });

  const dateString = useMemo(() => selected.startDate && getDateTimeStringFull(selected.startDate), [selected.startDate]);

  useEffect(() => setFormTab(Object.values(selected).filter(v => !!v).length), [selected]);

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
    const tabs = [];
    tabs.push(<SelectService key="selectService" services={services} setSelected={setSelected} />)

    if (!selected.service) return tabs;
    const filteredStaff = staff.filter(s => selected.service!.assigned_staff.find(staff => staff.id === s.id));
    tabs.push(<SelectAgent key="selectAgent" setSelected={setSelected} businessId={business.id} staff={filteredStaff} />)

    if (!selected.staff) return tabs;
    tabs.push(<SelectTime key="selectTime" setSelected={setSelected} business={business} selectedStaff={selected.staff} selectedService={selected.service} />);

    if (!selected.startDate) return tabs;
    tabs.push(<Confirm setSuccessModal={setSuccessDetails} setSelected={setSelected} business={business} selected={selected} key="confirm" />)

    return tabs;
  }, [business, selected, services, staff]);

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
                <div key={label} className={styles.progressLabel}>
                  <p key={label} className={clsx({[styles.current]: formTab === i})}>{label}</p>
                  {i !== 3 && <hr />}
                </div>
              )}
            </div>
            <div className={styles.formShowing}>
              {businessDataLoading ? <Spinner style={{margin: 30}} /> : tabs[formTab]}
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
            </div>
          </Card>
        </div>
      </div>

      {successDetails && <Modal open={!!successDetails} 
        onClose={() => setSuccessDetails(null)}
        noOffset
        actionButtonText='Close'
        actionCloses
        onAction={() => setSuccessDetails(null)}
        className={formStyles.success}
      >
        <Modal.Header>Appointment Booked!</Modal.Header>
        <p>Your booking has been placed.</p>
        <p className={formStyles.date}>{dateString}</p>
        <div className={formStyles.overview}>
          <div className={formStyles.agent}>
            <p>Your agent</p>
            <Card className={formStyles.agentCard}>
              <Avatar src={successDetails.staff.avatar} size={114} />
              <p className={formStyles.name}>{successDetails.staff.name}</p>
              <p className={formStyles.credentials}>Credentials</p>
            </Card>
          </div>
          <div className={formStyles.service}>
            <p>Your Service</p>
            <Card className={formStyles.serviceCard} style={{borderColor: successDetails.service.color}}>
              <div className={formStyles.serviceDetails}>
                <p>{successDetails.service.name}</p>
                <p className={formStyles.serviceDuration}>{successDetails.service.duration} min</p>
              </div>
              <div>
                <p className={formStyles.business}>{business.name}</p>
              </div>
              <p className={formStyles.cost}>${successDetails.service.cost.toFixed(2)}</p>
            </Card>
          </div>
        </div>
      </Modal>}
    </div>
  )
}