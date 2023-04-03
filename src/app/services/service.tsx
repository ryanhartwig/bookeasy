import styles from './services.module.scss';
import { Service } from "@/types/Service"
import { sample_members, sample_user } from '@/utility/sample_data/sample_user';
import Image from 'next/image';

import { BsFillCameraVideoFill } from 'react-icons/bs';

export default async function ServiceCard({service, edit}: { service: Service, edit?: boolean}) {

  const assignees = sample_members
    .filter(member => service.userIds.includes(member.id))
    .concat([sample_user])
  ;

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