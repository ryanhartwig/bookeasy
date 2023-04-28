import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel"
import { NewBusiness } from "@/types/Business"
import { Service } from "@/types/Service";
import { useState } from "react";
import ServiceCard from "./service"
import styles from './services.module.scss';

interface ServicesListProps {
  business: NewBusiness,
}

export const ServicesList: React.FC<ServicesListProps> = ({business}) => {

  const [services, setServices] = useState<Service[]>([]);

  console.log(business);
  return (
    <div className={styles.services_wrapper}>
      <SectionLabel label={business.user_id ? `${business.name} (My Business)` : business.name} />
      {services.map(s => 
      <div key={s.id}>
        <ServiceCard service={s} />
      </div>
      )}
    </div>
  )
}