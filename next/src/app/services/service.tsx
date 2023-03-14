'use client';

import styles from './services.module.scss';
import { Service } from "@/types/Service"

interface ServiceCardProps {
  service: Service
}

export const ServiceCard: React.FC<ServiceCardProps> = ({service}) => {


  return (
    <div className={styles.service} style={{borderLeftColor: service.color}}>
      <p>{service.name}</p>
      <p>{service.duration} min</p>
      <p>{service.provider}</p>
      <p>a</p>
      <p>${service.cost.toFixed(2)}</p>
    </div>
  )
}