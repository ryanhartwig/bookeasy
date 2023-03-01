import '@/styles/globals.css'
import '@/styles/home.css';

import { Navigator } from '../components/Navigator';
import { Header } from '../components/Header';

export default function RootLayout({children}: { children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <main className='main'>
          <Navigator />
          <div className='Content'>
            <Header />
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