import './globals.css'
import './home.scss';

import { gql } from '@apollo/client';
import { getClient } from '@/utility/functions/getClient';
import { Navigator } from '@/components/Navigator';

const query = gql`
  query { 
    userCollection(first:100) {
      edges {
        node {
          name
        }
      }
    }
  }
`

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