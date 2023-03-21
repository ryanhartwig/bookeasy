"use client";

import Image from 'next/image';
import * as bookit from '../../public/assets/logo_temp.svg';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import navlinks from '@/utility/data/navlinks';

import styles from './navigator.module.scss';
import clsx from 'clsx';
import { MdOutlineSpaceDashboard } from 'react-icons/md';

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
            <Icon />
            <p>{name}</p>
          </Link>
        ))}
        <hr />
        <Link className={clsx('Navigator_link', {'active': path === '/settings'})} href='settings'>
          <MdOutlineSpaceDashboard />
          <p>Settings</p>
        </Link>
      </div>
    </div>
  )
}