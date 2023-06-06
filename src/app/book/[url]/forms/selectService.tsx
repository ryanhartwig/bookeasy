import { ServiceCard } from '@/app/home/services/service';
import { Service } from '@/types/Service';
import React from 'react';
import styles from './forms.module.scss';

interface SelectServiceProps {
  services: Service[],
  setSelected: React.Dispatch<React.SetStateAction<any>>,
}

export const SelectService: React.FC<SelectServiceProps> = ({services, setSelected}) => {

  return (
    <div className={styles.selectService}>
      {services.filter(s => !s.deleted).map(s => (
        <div key={s.id}>
          <ServiceCard key={s.id} service={s} onClick={() => {setSelected((p: any) => ({...p, service: s}))}} hideProvider />
        </div>
      ))}
    </div>
  )
}