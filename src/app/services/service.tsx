import styles from './services.module.scss';
import { Service } from "@/types/Service"

import { BsFillCameraVideoFill } from 'react-icons/bs';
import { Avatar } from '@/components/UI/Avatar/Avatar';

export default function ServiceCard({service, edit}: { service: Service, edit?: boolean}) {
   
  return (
    <div className={styles.service} style={{borderLeftColor: service.color}}>
      {service.is_video && 
      <div className={styles.video}>
        <BsFillCameraVideoFill size={16} />
      </div>}
      <p>{service.name}</p>
      <p>{service.duration} min</p>
      <p>{service.provider}</p>
      <div className={styles.assignees}>
        {service.assigned_users.map(user => 
          <div key={user.id}>
            <Avatar src={user.avatar} size={26} />
            <p>{user.name}</p>
          </div>
        )}
      </div>
      <p>${service.cost.toFixed(2)}</p>
      {edit && <p className={styles.edit}>Edit</p>}
    </div>
  )
}