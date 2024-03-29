import { useUser } from "@/app/Providers";
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel"
import { NewBusiness } from "@/types/Business"
import { Service } from "@/types/Service";
import { GET_BUSINESS_SERVICES } from "@/utility/queries/businessQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ServiceCard } from "./service"
import styles from './services.module.scss';

interface ServicesListProps {
  business: NewBusiness,
  setSelectedService: React.Dispatch<React.SetStateAction<Service | undefined>>,
}

export const ServicesList: React.FC<ServicesListProps> = ({business, setSelectedService}) => {
  const { data, loading } = useQuery(GET_BUSINESS_SERVICES, { variables: { businessId: business.id }});
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    if (!data || loading) return;
    setServices(data.getBusinessServices);
  }, [data, loading]);

  return (
    <div className={styles.services_wrapper}>
      <SectionLabel label={business.name} />
      {services.length ? services
        .filter(s => !s.deleted)
        .map(s => 
      <div key={'slist' + s.id}>
        <ServiceCard service={s} onClick={() => setSelectedService(s)} />
      </div>
      )
      : <p className={styles.noservices}>No services to show</p>
    }
    </div>
  )
}