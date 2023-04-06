'use client';

import { Avatar } from "@/components/UI/Avatar/Avatar";
import { Business } from "@/types/Business";
import { User } from "@/types/User";
import { UserMeta } from "@/utility/functions/fetch/business/getBusinessUserMeta";
import styles from './teams.module.scss';

interface MembersProps {
  members: User[],
  meta: UserMeta[],
}

export const Members: React.FC<MembersProps> = ({members, meta}) => {

  return (
    <>
      <h2>Team Members</h2>
      <hr />
      <div className={styles.members}>
        {members.map(m => (
          <div key={m.id}>
            <Avatar src={m.avatar} size={30} />
            <p>{m.name}</p>
            <p>{meta.find(meta => meta.userId === m.id)!.elevated ? 'Admin' : 'Member'}</p>
          </div>
        ))}
      </div>
    </>
  )
}