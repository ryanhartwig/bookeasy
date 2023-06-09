import styles from './services.module.scss';
import { Service } from "@/types/Service"

import { BsFillCameraVideoFill } from 'react-icons/bs';
import { Avatar } from '@/components/UI/Avatar/Avatar';
import clsx from 'clsx';
import { FiEdit2 } from 'react-icons/fi';

interface ServiceCardProps {
  service: Service,
  onClick: (...args:any) => any,
  hideProvider?: boolean,
  hideEdit?: boolean,
}

export const ServiceCard: React.FC<ServiceCardProps> = ({service, onClick, hideProvider = false, hideEdit = false}) => {
   
  return (
    <div className={clsx(styles.service)} style={{borderLeftColor: service.color}} onClick={(e) => onClick && onClick(e)}>
      {service.is_video && 
        <div className={styles.video}>
          <BsFillCameraVideoFill size={16} />
        </div>
      }
      <p>{service.name}</p>
      <p>{service.duration} min</p>
      {!hideProvider && <p>{service.provider}</p>}
      <div className={styles.assignees}>
        {service.assigned_staff.slice(0, 8).map((staff, i) => 
          <div key={staff.id}>
            {i === 7 
              ? <p style={{margin: '0px 0px 4px 7px'}}>...</p>
              : <>
                <Avatar src={staff.avatar} size={26} />
                <p className={styles.tooltip}>{staff.name}</p>
              </>
            }
          </div>
        )}
      </div>
      <p>${service.cost.toFixed(2)}</p>

      {!hideEdit && <div className={styles.edit}>
        <FiEdit2 />
      </div>}
    </div>
  )
}