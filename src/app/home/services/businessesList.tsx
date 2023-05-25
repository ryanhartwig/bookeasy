'use client';

import { NewBusiness } from "@/types/Business";
import { GET_USER_BUSINESSES } from "@/utility/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ServiceForm } from "./serviceForm/serviceForm";
import { ServicesList } from "./servicesList";

import styles from './services.module.scss';
import { AiOutlinePlus } from "react-icons/ai";
import { Service } from "@/types/Service";
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel";
import { ServiceCard } from "./service";
import { LoadingDots } from "@/components/UI/LoadingDots/LoadingDots";

interface BusinessesListProps {
  userId: string,
}

export const BusinessesList: React.FC<BusinessesListProps> = ({userId}) => {

  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);
  const [serviceFormOpen, setServiceFormOpen] = useState<boolean>(false);
  const [selectedService, setSelectedService] = useState<Service>();

  const { data, loading } = useQuery(GET_USER_BUSINESSES, { variables: { userId }});

  useEffect(() => {
    if (!data || loading) return;
    setBusinesses(data.getUserBusinesses);  
  }, [data, loading]);

  useEffect(() => {
    if (!selectedService) return;
    setServiceFormOpen(true);
  }, [selectedService]);

  useEffect(() => {
    if (serviceFormOpen) return;
    setSelectedService(undefined);
  }, [serviceFormOpen]);

  return (
    <>
      {businesses.map(b => (  
        <ServicesList key={b.id} business={b} setSelectedService={setSelectedService} />
      ))}
      {loading && 
        <div className={styles.services_wrapper}>
          <SectionLabel label={'Loading Services'} />
          <LoadingDots style={{justifyContent: "flex-start", margin: 15}} />
        </div>
      }
      {serviceFormOpen && <ServiceForm open={serviceFormOpen} setOpen={setServiceFormOpen} userId={userId} initialService={selectedService} onSubmit={() => setSelectedService(undefined)} />}
      {!loading && <div className={styles.addService} onClick={() => setServiceFormOpen(true)}>
        <AiOutlinePlus fontSize={18} />
      </div>}
    </>
  )
}