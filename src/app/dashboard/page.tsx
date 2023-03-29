import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
import { sample_appointments } from '@/utility/sample_data/sample_appointments';
import { getCurrentWeek } from '@/utility/functions/getCurrentWeek';
import { Appointments } from './appointments';

import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Header } from '@/components/Header';

import { gql } from '@apollo/client';
import { getClient } from '@/utility/functions/getClient';
import { Appointment } from '@/types/Appointment';

const query = gql`
  query UserAppointmentsQuery($after: String!, $id: ID!) {
  user(by: {id: $id}) {
    appointments(first:100, after: $after) {
      edges {
        node {
          id
          startDate
          endDate
          client {
            id
          }
          serviceName
          isVideo
        }
      }
      pageInfo {
        hasNextPage 
        endCursor
      }
    }
  }
}
`

// {
//   "data": {
//     "user": {
//       "appointments": {
//         "edges": [
//           {
//             "node": {
//               "client": {
//                 "name": "Steven Price"
//               },
//               "endDate": "1679922000000",
//               "id": "appointment_01GWJGT2D7VCA17AN9PAG9A8QE",
//               "isVideo": true,
//               "serviceName": "Initial Consult",
//               "startDate": "1679918400000"
//             }
//           },
//           {
//             "node": {
//               "client": {
//                 "name": "Emilie Gray"
//               },
//               "endDate": "1679928300000",
//               "id": "appointment_01GWJH273QQ47HAYAQWZGC6YWW",
//               "isVideo": true,
//               "serviceName": "Full Consult",
//               "startDate": "1679923800000"
//             }
//           }
//         ],
//         "pageInfo": {
//           "endCursor": "YXBwb2ludG1lbnRfMDFHV0pIMjczUVE0N0hBWUFRV1pHQzZZV1c",
//           "hasNextPage": false
//         }
//       }
//     }
//   }
// }

export default async function Page() {

  const allAppointments: Partial<Appointment>[] = [];

  const client = getClient();
  let after = '';

  const fillAppointments = async () => {
    try {
      const { data } = await client.query({ query, variables: {
        after,
        id: "user_01GWHJK2PJ3C1DGYJY32YSJFQ3" // default sample user
      } });
      const { appointments } = data.user;

      allAppointments.push(appointments.edges.map((edge: any) => ({...edge.node, client: undefined, clientId: edge.node.client.id}) as Partial<Appointment>))
      if (appointments.pageInfo.hasNextPage) {
        after = appointments.pageInfo.endCursor;
        await fillAppointments();
      }
      
    } catch(e) {
      console.log(e);
    }
    
  }
  await fillAppointments();

  console.log(allAppointments);
  
  const [start, end] = getCurrentWeek();

  
  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <SecondaryHeader>
          <div className={styles.header}>
            <div>
              <p style={{fontWeight: 100}}>Week of</p>
              <p className={styles.headerLarge}>
                {`${start.toDateString().split(' ').slice(1, 3).join(' ')}`} - {`${end.toDateString().split(' ').slice(1, 3).join(' ')}`}
              </p>
            </div>
            <div>
              <p className={styles.headerLarge}>{sample_appointments.length}</p>
              <p style={{fontWeight: 100}}>Appointments</p>
            </div>
            <div>
              <p className={styles.headerLarge}>$0.00</p>
              <p style={{fontWeight: 100}}>Projected</p>
            </div>
          </div>
        </SecondaryHeader>
        <div className={styles.content}>
          <SectionLabel label='Today' />
          <Appointments appointments={sample_appointments} />
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames start={start} />
            <WeekDays appointments={sample_appointments} />
          </Card>
        </div>
      </div>
    </>
  )
}