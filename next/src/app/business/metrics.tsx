'use client';

import { User } from "@/types/User";
import { useRef, useState } from "react";

interface MetricsProps {
  user: User,
}

export const Metrics: React.FC<MetricsProps> = ({user}) => {

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());  
  
  return (
    <>
      
    </>
  )
}