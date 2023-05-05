import { Avatar } from '@/components/UI/Avatar/Avatar';
import { Card } from '@/components/UI/Card/Card';
import { AvailabilitySlice } from '@/types/BaseAvailability';
import { NewBusiness } from '@/types/Business';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { User } from '@/types/User';
import { GET_USER_AVAILABILITY } from '@/utility/queries/availabilityQueries';
import { GET_BUSINESS_CLIENTS, GET_BUSINESS_SERVICES } from '@/utility/queries/businessQueries';
import { useQuery } from '@apollo/client';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import styles from './business.module.scss';
import { Metrics } from './metrics';
import { Settings } from './settings';

interface BusinessProps {
  user: User,
  business: NewBusiness,
}

export const Business: React.FC<BusinessProps> = ({user, business}) => {

  const [services, setServices] = useState<Service[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [availability, setAvailability] = useState<AvailabilitySlice[]>([]);
  
  const { data: servicesData } = useQuery(GET_BUSINESS_SERVICES, { variables: { businessId: business.id }});
  const { data: clientsData } = useQuery(GET_BUSINESS_CLIENTS, { variables: { businessId: business.id }});
  const { data: availabilityData } = useQuery(GET_USER_AVAILABILITY, { variables: { userId: user.id, businessId: business.id }});

  useEffect(() => {
    if (!servicesData) return;
    setServices(servicesData.getBusinessServices);
  }, [servicesData]);

  useEffect(() => {
    if (!clientsData) return;
    setClients(clientsData.getBusinessClients);
  }, [clientsData]);

  useEffect(() => {
    if (!availabilityData) return;
    setAvailability(availabilityData.getUserAvailability.filter((a: AvailabilitySlice) => a.business_id === business.id));
  }, [availabilityData, business.id]);
  
  return (
    <div className={styles.business}>
      {/* Left panels */}
      <div>    
        <Card className={clsx(styles.card, styles.overview)}>
          
          <Avatar src={business.avatar} size={100} style={{margin: 15}} />
          <p className={styles.name}>{business.name}</p>
          <hr />
          <div className={styles.details}>
            <div>
              <p>{clients.length}</p>
              <p>client(s)</p>  
            </div>
            <div>
              <p>{services.length}</p>
              <p>service(s)</p>  
            </div>
          </div>
        </Card>
        <Card className={clsx(styles.card, styles.metrics)}>
          {user && <Metrics user={user} clients={clients} businessId={business.id} />}
        </Card>
      </div>

      {/* Right panel */}
      <div>
        <Card className={clsx(styles.card, styles.prefs)}>
          <Settings business={business} clients={clients} services={services} user={user} availability={availability} />
        </Card>
      </div>
    </div>
  )
}