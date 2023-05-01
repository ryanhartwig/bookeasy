'use client';

import { NewBusiness } from "@/types/Business";
import { GET_USER_BUSINESSES } from "@/utility/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ServiceForm } from "./serviceForm/serviceForm";
import { ServicesList } from "./servicesList";

import styles from './services.module.scss';
import { AiOutlinePlus } from "react-icons/ai";

interface BusinessesListProps {
  userId: string,
}

export const BusinessesList: React.FC<BusinessesListProps> = ({userId}) => {

  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);
  const [serviceFormOpen, setServiceFormOpen] = useState<boolean>(false);

  const { data, loading } = useQuery(GET_USER_BUSINESSES, { variables: { userId }});

  useEffect(() => {
    if (!data || loading) return;
    setBusinesses(data.getUserBusinesses);  
  }, [data, loading]);

  return (
    <>
      {businesses.map(b => (  
        <ServicesList key={b.id} business={b} />
      ))}
      <ServiceForm open={serviceFormOpen} setOpen={setServiceFormOpen} userId={userId}  />
      <div className={styles.add_service} onClick={() => setServiceFormOpen(true)}>
        <AiOutlinePlus fontSize={18} />
      </div>
    </>
  )
}