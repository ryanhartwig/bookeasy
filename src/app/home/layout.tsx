import './home.scss';

import { Navigator } from '@/components/Navigator';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export default async function Layout({children}: { children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }

  return (
    <div className='main'>
      <Navigator />
      <div className='Content'>
          {children}
      </div>
    </div>
  )
}