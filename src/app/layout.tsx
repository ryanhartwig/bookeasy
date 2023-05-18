import './globals.css'

import { Providers } from './Providers';

export default async function RootLayout({children}: { children: React.ReactNode}) {

  return (
    <html lang="en">
      <body>
        <main>
          <div>
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