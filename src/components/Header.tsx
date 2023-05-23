'use client';

import clsx from "clsx";
import { signOut } from "next-auth/react";
import styles from './header.module.scss';
interface HeaderProps {
  text: string,
  loading?: boolean,
}

export const Header: React.FC<HeaderProps> = ({text, loading = false}) => {

  return (
    <div className={clsx(styles.header, {[styles.loading]: loading})}>
      {loading && <div className={styles.loadingTrack}>
        <span />
      </div>}
      <h2>{text}</h2>
      <p onClick={() => signOut()}>Logout</p>
    </div>
  )
}