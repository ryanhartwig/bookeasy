import { ServiceCard } from '@/app/services/service';
import { Service } from '@/types/Service';
import styles from './tabs.module.scss';

interface ServicesProps {
  services: Service[],
}

export const Services: React.FC<ServicesProps> = ({services}) => {

  return (
    <div className={styles.Services}>
      {services.map(s => (
        <ServiceCard key={s.id} service={s} edit />
      ))}
    </div>
  )
}
