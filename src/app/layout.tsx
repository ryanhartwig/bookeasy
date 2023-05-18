import './globals.css'

import { Providers } from './Providers';
import { ReactNode } from 'react';

interface IProps {
  children: ReactNode,
}

export default async function RootLayout({children}: IProps) {
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