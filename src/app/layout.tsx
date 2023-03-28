import './globals.css'
import './home.scss';

import { gql } from '@apollo/client';
import { getClient } from '@/utility/functions/getClient';

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

import { Navigator } from '@/components/Navigator';
// import { gql, grafbase } from '../../lib/grafbase';

// const GetAllUsersQuery = gql`
//   query {
//     userCollection(first:100) {
//       edges {
//         node {
//           name
//           id
//         }
//       }
//     }
//   }
// `

export default async function RootLayout({children}: { children: React.ReactNode}) {

  // const { userCollection } = await grafbase.request(GetAllUsersQuery) as any;

  const client = getClient();
  const { data } = await client.query({ query });
  
  return (
    <html lang="en">
      <body>
        <main className='main'>
          <Navigator />
          <div className='Content'>
            {/* {children} */}
            <p>{JSON.stringify({data})}</p>
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