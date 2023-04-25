import './globals.css'
import './home.scss';

import { Navigator } from '@/components/Navigator';
import { Providers } from './Providers';

export default async function RootLayout({children}: { children: React.ReactNode}) {

  return (
    <html lang="en">
      <body>
        <main className='main'>
          <Navigator />
          <div className='Content'>
            <Providers>
              {children}
            </Providers>
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