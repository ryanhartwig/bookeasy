import './home.scss';

import { Navigator } from '@/components/Navigator';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { LoadingSplash } from '@/components/UI/LoadingSplash/LoadingSplash';

import styles from './layout.module.scss';


export default async function Layout({children}: { children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <div className='main'>
      <div className={styles.loginBackground}>
        <div className={styles.login}>
          <LoadingSplash skipTranslate />
        </div> 
      </div>
      <Navigator />
      <div className='Content'>
          {children}
      </div>
    </div>
  )
}
