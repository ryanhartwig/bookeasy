'use client';

import { Avatar } from "@/components/UI/Avatar/Avatar";
import { Staff } from "@/types/User";
import clsx from "clsx";
import { VscVerifiedFilled, VscUnverified } from "react-icons/vsc";
import styles from './teams.module.scss';

interface MembersProps {
  staff: Staff[],
}

export const Members: React.FC<MembersProps> = ({staff}) => {

  return (
    <>
      <h2>Team Members</h2>
      <hr />
      <div className={styles.members}>
        {staff.map(s => (
          <div key={s.id} className={styles.staff}>
            <div className={clsx(styles.status, {[styles.registered]: s.registered_user_id})}>
              {s.registered_user_id ? <VscVerifiedFilled fontSize={15} /> : <VscUnverified fontSize={15} />}
              <p className={styles.tooltip}>{s.registered_user_id ? 'Registered User' : 'Unregistered'}</p>
            </div>
            <Avatar src={s.avatar} size={30} />
            <p className={styles.name}>{s.name}</p>
            <p className={styles.elevated}>{s.elevated ? 'Admin' : 'Member'}</p>
          </div>
        ))}
      </div>
    </>
  )
}