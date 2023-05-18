'use client';

import { signOut } from "next-auth/react";

interface HeaderProps {
  text: string,
}

export const Header: React.FC<HeaderProps> = ({text}) => {

  return (
    <div className='Header'>
      <h2>{text}</h2>
      <p onClick={() => signOut()}>Logout</p>
    </div>
  )
}