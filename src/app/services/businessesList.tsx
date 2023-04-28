'use client';

import { NewBusiness } from "@/types/Business";
import { GET_USER_BUSINESSES } from "@/utility/queries/userQueries";
import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { ServicesList } from "./servicesList";

interface BusinessesListProps {
  userId: string,
}

export const BusinessesList: React.FC<BusinessesListProps> = ({userId}) => {

  const [businesses, setBusinesses] = useState<NewBusiness[]>([]);

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
    </>
  )
}