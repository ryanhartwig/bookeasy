import styles from './services.module.scss';
import { Service } from "@/types/Service"

import { BsFillCameraVideoFill } from 'react-icons/bs';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import clsx from 'clsx';
import { FiEdit2 } from 'react-icons/fi';

export default function ServiceCard({service, onClick}: { service: Service, onClick?: (...args: any) => any}) {
   
  return (
    <div className={clsx(styles.service)} style={{borderLeftColor: service.color}} onClick={(e) => onClick && onClick(e)}>
      {service.is_video && 
        <div className={styles.video}>
          <BsFillCameraVideoFill size={16} />
        </div>
      }
      <p>{service.name}</p>
      <p>{service.duration} min</p>
      <p>{service.provider}</p>
      <div className={styles.assignees}>
        {service.assigned_staff.map(staff => 
          <div key={staff.id}>
            <Avatar src={staff.avatar} size={26} />
            <p>{staff.name}</p>
          </div>
        )}
      </div>
      <p>${service.cost.toFixed(2)}</p>

      <div className={styles.edit}>
        <FiEdit2 />
      </div>
    </div>
  )
}