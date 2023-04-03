import styles from './services.module.scss';
import { Service } from "@/types/Service"
import Image from 'next/image';

import { BsFillCameraVideoFill } from 'react-icons/bs';
import { getServiceUsers } from '@/utility/functions/fetch/getServiceUsers';
import { BsPersonCircle } from 'react-icons/bs';

export default async function ServiceCard({service, edit}: { service: Service, edit?: boolean}) {

  const { data: assignees, error } = await getServiceUsers(service.id);
   
  return error ? <p>{JSON.stringify(error.message)}</p> : (
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
            {user.avatar ? <Image src={user.avatar} alt="User avatar" height={26} width={26} />
            : <BsPersonCircle fontSize={26} color={'rgb(210, 210, 210)'} />}
            <p>{user.name}</p>
          </div>
        )}
      </div>
      <p>${service.cost.toFixed(2)}</p>
      {edit && <p className={styles.edit}>Edit</p>}
    </div>
  )
}