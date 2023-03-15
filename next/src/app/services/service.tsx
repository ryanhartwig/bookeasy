'use client';

import styles from './services.module.scss';
import { Service } from "@/types/Service"
import { useMemo } from 'react';
import { User } from '@/types/User';
import { sample_members, sample_user } from '@/utility/sample_data/sample_user';
import Image from 'next/image';

interface ServiceCardProps {
  service: Service
}

export const ServiceCard: React.FC<ServiceCardProps> = ({service}) => {

  const assignees = useMemo<User[]>(() => 
    sample_members.filter(member => service.user_ids.includes(member.id))
      .concat([sample_user])
  , [service.user_ids]);

  return (
    <div className={styles.service} style={{borderLeftColor: service.color}}>
      <p>{service.name}</p>
      <p>{service.duration} min</p>
      <p>{service.provider}</p>
      <div className={styles.assignees}>
        {assignees.map(user => 
          <Image key={user.id} src={user.avatar || ''} alt="User avatar" height={30} width={30} />
        )}
      </div>
      <p>${service.cost.toFixed(2)}</p>
    </div>
  )
}