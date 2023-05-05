'use client';

import { Avatar } from "@/components/UI/Avatar/Avatar";
import { BusinessUser } from "@/types/User";
import styles from './teams.module.scss';

interface MembersProps {
  members: BusinessUser[],
}

export const Members: React.FC<MembersProps> = ({members}) => {

  return (
    <>
      <h2>Team Members</h2>
      <hr />
      <div className={styles.members}>
        {members.map(m => (
          <div key={m.user.id}>
            <Avatar src={m.user.avatar} size={30} />
            <p>{m.user.name}</p>
            <p>{m.elevated ? 'Admin' : 'Member'}</p>
          </div>
        ))}
      </div>
    </>
  )
}