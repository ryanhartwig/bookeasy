'use client';

import { Avatar } from "@/components/UI/Avatar/Avatar";
import { Staff } from "@/types/User";
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
          <div key={s.id}>
            <Avatar src={s.avatar} size={30} />
            <p>{s.name}</p>
            <p>{s.elevated ? 'Admin' : 'Member'}</p>
          </div>
        ))}
      </div>
    </>
  )
}