import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
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
import { Service } from '@/types/Service';
import { getAllAppointments } from '@/utility/functions/fetch/getAllAppointments';



const servicesQuery = gql`
  query UserServicesQuery($after: String!,  $id: ID!) {
  user(by: {id: $id}) {
    services(first:100, after: $after) {
      edges {
        node {
          id 
          business { id }
          name
          duration
          provider
          cost
          isVideo
          color
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

export default async function Page() {

  const { appointments, error } = await getAllAppointments('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const allServices: Service[] = [];

  const client = getClient();
  let servicesAfter = '';

  const fillServices = async () => {
    try {
      const { data } = await client.query({ query: servicesQuery, variables: {
        after: servicesAfter,
        id: "user_01GWHJK2PJ3C1DGYJY32YSJFQ3" // default sample user
      } });
      const { services } = data.user;

      allServices.push(...services.edges.map((edge: any) => parseToService(edge.node)))
      if (services.pageInfo.hasNextPage) {
        servicesAfter = services.pageInfo.endCursor;
        await fillServices();
      }
    } catch(e) {
      console.log(e);
    }
  }


  
  await fillServices();

  console.log(appointments);
  console.log(allServices);

  
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
              <p className={styles.headerLarge}>{appointments.length}</p>
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
          <Appointments appointments={appointments} services={allServices} />
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames start={start} />
            <WeekDays appointments={appointments} />
          </Card>
        </div>
      </div>
    </>
  )
}