'use client';

import { useUser } from "@/app/Providers";
import { useClickout } from "@/utility/hooks/useClickout";
import { GET_USER } from "@/utility/queries/userQueries";
import { useQuery } from "@apollo/client";
import { signOut } from "next-auth/react";
import { useRef, useCallback, useState } from "react";
import { FiLogOut } from "react-icons/fi";
import { Avatar } from "./Avatar/Avatar";
import styles from './logout.module.scss';

export const Logout = () => {
  const { id: userId } = useUser();
  const { data: userData } = useQuery(GET_USER, { variables: { userId }});

  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const onToggleMenu = useCallback((e: any) => {
    if (menuRef.current?.contains(e.target)) return;
    setProfileMenuOpen(p => !p);
  }, []);
  useClickout({ onClickout: () => setProfileMenuOpen(false), contentRefs: [profileRef], enabled: true})
  
  return (
    <div className={styles.profile} onClick={onToggleMenu} ref={profileRef}>
      <Avatar src={userData?.getUser.avatar} />
      {profileMenuOpen && 
      <div className={styles.profileMenu} ref={menuRef}>
        <ul>
          <li onClick={() => {signOut(); setProfileMenuOpen(false)}}>
            <FiLogOut style={{opacity: 0.7}} />
            <p>Logout</p>
          </li>
        </ul>
      </div>}
    </div>
  )
}