'use client';

import styles from './services.module.scss';
import { Service } from "@/types/Service"
import { useMemo } from 'react';
import { User } from '@/types/User';
import { sample_members, sample_user } from '@/utility/sample_data/sample_user';
import Image from 'next/image';

import { BsFillCameraVideoFill } from 'react-icons/bs';

interface ServiceCardProps {
  service: Service
  edit?: boolean,
}

export const ServiceCard: React.FC<ServiceCardProps> = ({service, edit}) => {

  const assignees = useMemo<User[]>(() => 
    sample_members.filter(member => service.userIds.includes(member.id))
      .concat([sample_user])
  , [service.userIds]);

  return (
    <div className={styles.service} style={{borderLeftColor: service.color}}>
      {service.isVideo && 
      <div className={styles.video}>
        <BsFillCameraVideoFill size={16} />
      </div>}
      <p>{service.name}</p>
      <p>{service.duration} min</p>
      <p>{service.provider}</p>
      <div className={styles.assignees}>
        {assignees.map(user => 
          <div key={user.id}>
            <Image src={user.avatar || ''} alt="User avatar" height={30} width={30} />
            <p>{user.name}</p>
          </div>
        )}
      </div>
      <p>${service.cost.toFixed(2)}</p>
      {edit && <p className={styles.edit}>Edit</p>}
    </div>
  )
}