'use client';

import { Business } from "@/types/Business";
import { User } from "@/types/User";
import Image from 'next/image';
import styles from './teams.module.scss';

interface MembersProps {
  members: User[],
  selected: Business,
}

export const Members: React.FC<MembersProps> = ({members, selected}) => {


  return (
    <>
      <h2>Team Members</h2>
      <hr />
      <div className={styles.members}>
        {members.map(m => (
          <div key={m.id}>
            <Image src={m.avatar ?? ''} alt={'Member avatar'} width={30}/>
            <p>{m.name}</p>
            <p>{m.businessIds.find(([id, elevated]) => id === selected.id)![1] ? 'Admin' : 'Member'}</p>
          </div>
        ))}
      </div>
    </>
  )
}