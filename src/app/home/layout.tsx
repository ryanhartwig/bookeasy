import './home.scss';

import { Navigator } from '@/components/Navigator';

export default async function RootLayout({children}: { children: React.ReactNode}) {

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