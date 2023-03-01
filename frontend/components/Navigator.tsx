"use client";

import Image from 'next/image';
import * as bookit from '@/assets/logo_temp.svg';

import Link from 'next/link';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import navlinks from '@/data/navlinks';

export const Navigator = () => {
  const path = usePathname();

  useEffect(() => {console.log(path)}, [path]);

  return (
    <div className='Navigator'>
      <div className='Navigator_logo'>
        <Image className='Navigator_logo_icon' src={bookit} alt="Book it logo" />
        <span>book it.</span>
      </div>
      <div className='Navigator_links'>
        { navlinks.map(([name, url]) => (
          <Link href={url}><p className={path === `/${url}` ? 'active' : ''} >{name}</p></Link>
        ))}
        <hr />
        <Link href="settings"><p className={path === '/settings' ? 'active' : ''} >Settings</p></Link>
      </div>
    </div>
  )
}