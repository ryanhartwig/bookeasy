'use client';

import styles from './services.module.scss';
import { Service } from "@/types/Service"

interface ServiceCardProps {
  service: Service
}

export const ServiceCard: React.FC<ServiceCardProps> = ({service}) => {


  return (
    <div className={styles.service} style={{borderLeftColor: service.color}}>

    </div>
  )
}