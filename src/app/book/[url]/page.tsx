'use client';

import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { Modal } from '@/components/UI/Modal/Modal';
import { NewBusiness } from '@/types/Business';
import { Service } from '@/types/Service';
import { Staff } from '@/types/User';
import { getDateTimeStringFull } from '@/utility/functions/conversions/getDateTimeString';
import { GET_BOOKING_SITE } from '@/utility/queries/bookingSiteQueries';
import { GET_BUSINESS, GET_BUSINESS_SERVICES, GET_BUSINESS_STAFF } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './book.module.scss';
import Loading from './loading';
import { NotFound } from './notfound';
import formStyles from './forms/forms.module.scss';
import { Book } from './book';
import { About } from './about';
import { useUser } from '@/app/Providers';
import { Login } from './login';
import { GET_USER } from '@/utility/queries/userQueries';
import { MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { useClickout } from '@/utility/hooks/useClickout';
import { FiLogOut } from 'react-icons/fi';
import { AiOutlineSchedule } from 'react-icons/ai';
import { signOut } from 'next-auth/react';
import { ClientApps } from './clientApps';
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
  const { id: userId } = useUser();

  const { data: userData, loading: loadingUserData } = useQuery(GET_USER, { variables: { userId }});

  const [tab, setTab] = useState('Book');
  const [business, setBusiness] = useState<NewBusiness>();
  const [services, setServices] = useState<Service[]>([]);
  const [staff, setStaff] = useState<Staff[]>([]);
  const [successDetails, setSuccessDetails] = useState<Details | null>(null);
  const [selected, setSelected] = useState<SelectedState>({
    service: null,
    staff: null,
    startDate: null,
  });
  const [profileMenuOpen, setProfileMenuOpen] = useState<boolean>(false);
  const [showAppointments, setShowAppointments] = useState<boolean>(false);

  const dateString = useMemo(() => selected.startDate && getDateTimeStringFull(selected.startDate), [selected.startDate]);

  // Booking site & business data if available
  const { data: bookingSiteData, loading: loadingBookingSiteData } = useQuery(GET_BOOKING_SITE, { variables: { url: params.url }});
  const { data: businessData, loading: loadingBusinessData } = useQuery(GET_BUSINESS, { variables: { businessId: bookingSiteData?.getBookingSite?.business_id }, skip: !bookingSiteData?.getBookingSite })
  useEffect(() => businessData && setBusiness(businessData.getBusiness), [businessData]);

  // Form data
  const { data: servicesData, loading: loadingServicesData} = useQuery(GET_BUSINESS_SERVICES, { variables: { businessId: business?.id }, skip: !business });
  useEffect(() => servicesData && setServices(servicesData.getBusinessServices), [businessData, servicesData]);
  const { data: staffData, loading: loadingStaffData} = useQuery(GET_BUSINESS_STAFF, { variables: { businessId: business?.id }, skip: !business });
  useEffect(() => staffData && setStaff(staffData.getBusiness.staff), [staffData]);

  const initialLoading = useMemo(() => loadingBookingSiteData || loadingBusinessData || loadingUserData, [loadingBookingSiteData, loadingBusinessData, loadingUserData]);
  const businessDataLoading = useMemo(() => loadingServicesData || loadingStaffData, [loadingServicesData, loadingStaffData]);

  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const onToggleMenu = useCallback((e: any) => {
    if (menuRef.current?.contains(e.target)) return;
    setProfileMenuOpen(p => !p);
  }, []);
  useClickout({ onClickout: () => setProfileMenuOpen(false), contentRefs: [profileRef], enabled: true})

  if (initialLoading) return <Loading />
  if (!userId) return <Login url={params.url} />
  if(!bookingSiteData?.getBookingSite || !business) return <NotFound />
  return (
    <div className={styles.background}>
      <div className={styles.header}>
        <div className={styles.profileWrapper}>
          <div className={styles.profile} onClick={onToggleMenu} ref={profileRef}>
            <Avatar src={userData.getUser.avatar} />
            <p>{userData.getUser.name.split(' ')[0]}</p>
            <MdOutlineKeyboardArrowDown style={{opacity: 0.5}} />

            {profileMenuOpen && 
            <div className={styles.profileMenu} ref={menuRef}>
              <ul>
                <li onClick={() => {signOut(); setProfileMenuOpen(false)}}>
                  <FiLogOut style={{opacity: 0.7}} />
                  <p>Logout</p>
                </li>
                <li onClick={() => {setShowAppointments(true); setProfileMenuOpen(false)}}>
                  <AiOutlineSchedule style={{opacity: 0.7, flexShrink: 0}} />
                  <p>Appointments</p>
                </li>
              </ul>
            </div>}
          </div>
        </div>
      </div>
      <div className={styles.page}>
        <div className={styles.title}>
          {business.avatar && <Avatar className={styles.businessPhoto} size={170} src={business.avatar} />}
          <h2 style={{marginLeft: business.avatar ? '170px' : ''}}>{business.name}</h2>
          <hr />
        </div>
        <div className={clsx(styles.navigation, 'noselect')}>
          {['Book', 'About'].map(label => 
            <p key={label} onClick={() => setTab(label)} className={clsx({[styles.current]: tab === label})}>{label}</p>
          )}
        </div>
        <div className={styles.form}>
          <Card className={styles.formCard}>
            {(() => { switch(tab) {
              case 'Book': return <Book selected={selected} business={business} loadingData={businessDataLoading} setSelected={setSelected} staff={staff} services={services} setSuccessDetails={setSuccessDetails}  />
              case 'About': return <About business={business} />
            }})()}
          </Card>
        </div>
      </div>

      <Modal open={showAppointments} 
        onClose={() => setShowAppointments(false)}
        noOffset
        className={styles.clientApps}
      >
        <Modal.Header>Your appointments</Modal.Header>
        <ClientApps />
      </Modal>

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