"use client";

import Image from 'next/image';
import * as bookit from '../../public/assets/logo_temp.svg';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navlinks from '@/utility/data/navlinks';

import clsx from 'clsx';
import { HiOutlineCog8Tooth } from 'react-icons/hi2';

export const Navigator = () => {
  const path = usePathname();

  return (
    <div className='Navigator'>
      <div className='Navigator_logo'>
        <Image className='Navigator_logo_icon' priority src={bookit} alt="Book it logo" />
        <span>book it.</span>
      </div>
      <div className='Navigator_links'>
        {navlinks.map(([name, url, Icon]) => (
          <Link className={clsx('Navigator_link', {'active': path === `/${url}`})} key={name} href={url}>
            <Icon size={22} color='rgba(240,240,240,0.9)' />
            <p>{name}</p>
          </Link>
        ))}
        <hr />
        <Link className={clsx('Navigator_link', {'active': path === '/settings'})} href='settings'>
          <HiOutlineCog8Tooth color='rgba(240,240,240,0.9)' />
          <p>Settings</p>
        </Link>
      </div>
    </div>
  )
}