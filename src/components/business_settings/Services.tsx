import ServiceCard from '@/app/services/service';
import { Service } from '@/types/Service';
import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './tabs.module.scss';

interface ServicesProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  services: Service[],
}

export const Services: React.FC<ServicesProps> = ({services, ...props}) => {

  return (
    <div {...props} className={clsx(styles.Services, props.className || '')}>
      {services.map(s => (
        <div key={s.id}>
          <ServiceCard key={s.id} service={s} edit />
        </div>
      ))}
    </div>
  )
}
