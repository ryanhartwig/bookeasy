import ServiceCard from '@/app/services/service';
import { ServiceForm } from '@/app/services/serviceForm/serviceForm';
import { Service } from '@/types/Service';
import { userId } from '@/utility/sample_data/sample_userId';
import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './tabs.module.scss';

interface ServicesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  services: Service[],
  businessId: string,
}

export const Services: React.FC<ServicesProps> = ({services, businessId, ...props}) => {

  const [serviceFormOpen, setServiceFormOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service>();
  
  // Used when adding new service, prepopulates business field (and prevents selecting different team)
  const initialService: Service = useMemo(() => ({
    assigned_users: [],
    business_id: businessId,
    color: '#1934b8',
    cost: 0,
    deleted: false,
    duration: 30,
    id: '',
    is_video: false,
    name: '',
    provider: '',
  }), [businessId]);

  useEffect(() => {
    if (!selectedService) return;
    setServiceFormOpen(true);
  }, [selectedService]);

  useEffect(() => {
    if (serviceFormOpen) return;
    setSelectedService(undefined);
  }, [serviceFormOpen]);

  return (
    <div {...props} className={clsx(styles.Services, props.className || '')}>
      {services.filter(s => !s.deleted).map(s => (
        <div key={s.id}>
          <ServiceCard key={s.id} service={s} onClick={(e) => {console.log(e); setSelectedService(s)}} />
        </div>
      ))}
      <ServiceForm 
        open={serviceFormOpen} 
        setOpen={setServiceFormOpen} 
        userId={userId} 
        initialService={selectedService} 
        onSubmit={() => setSelectedService(undefined)} 
        businessId={businessId}
      />
      <div className={styles.addService} onClick={(e) => setServiceFormOpen(true)}>
        <AiOutlinePlus fontSize={18} />
      </div>
    </div>
  )
}
