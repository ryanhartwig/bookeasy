import './globals.css'
import './home.scss';

import { Navigator } from '@/components/Navigator';

export default async function RootLayout({children}: { children: React.ReactNode}) {

  return (
    <html lang="en">
      <body>
        <main className='main'>
          <Navigator />
          <div className='Content'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}

export const metadata = {
  title: 'book it',
  description: 'Appointment scheduling solution',
}