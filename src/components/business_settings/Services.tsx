import { ServiceCard } from '@/app/home/services/service';
import { ServiceForm } from '@/app/home/services/serviceForm/serviceForm';
import { Service } from '@/types/Service';
import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes, useEffect, useMemo, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import styles from './tabs.module.scss';

interface ServicesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  services: Service[],
  businessId: string,
  isOwnBusiness?: boolean,
  userId: string,
}

export const Services: React.FC<ServicesProps> = ({services, userId, businessId, isOwnBusiness, ...props}) => {

  const [serviceFormOpen, setServiceFormOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service>();

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
          <ServiceCard key={s.id} service={s} onClick={() => {setSelectedService(s)}} hideProvider />
        </div>
      ))}
      <ServiceForm 
        open={serviceFormOpen} 
        setOpen={setServiceFormOpen} 
        userId={userId} 
        initialService={selectedService} 
        onSubmit={() => setSelectedService(undefined)} 
        businessId={businessId}
        isOwnBusiness={isOwnBusiness}
      />
      <div className={styles.addService} onClick={(e) => setServiceFormOpen(true)}>
        <AiOutlinePlus fontSize={18} />
      </div>
    </div>
  )
}
