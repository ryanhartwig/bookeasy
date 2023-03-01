import Image from 'next/image';
import * as bookit from '@/assets/logo_temp.svg';

import Link from 'next/link';

export const Navigator = () => {

  return (
    <div className='Navigator'>
      <div className='Navigator_logo'>
        <Image className='Navigator_logo_icon' src={bookit} alt="Book it logo" />
        <span>book it.</span>
      </div>
      <div className='Navigator_links'>
        <Link href="dashboard"><p>Dashboard</p></Link>
        <Link href="calendar"><p>Calendar</p></Link>
        <Link href="clients"><p>Clients</p></Link>
        <Link href="services"><p>Services</p></Link>
        <Link href="business"><p>My Business</p></Link>
        <Link href="teams"><p>Teams</p></Link>
        <hr />
        <Link href="settings"><p>Settings</p></Link>
      </div>
    </div>
  )
}