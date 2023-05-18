import './home.scss';

import { Navigator } from '@/components/Navigator';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from 'next/navigation';

export default async function RootLayout({children}: { children: React.ReactNode}) {

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

export const metadata = {
  title: 'book it',
  description: 'Appointment scheduling solution',
}