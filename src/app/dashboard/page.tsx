import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
import { getCurrentWeek } from '@/utility/functions/getCurrentWeek';
import { Appointments } from './appointments';

import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Header } from '@/components/Header';

import { getAllAppointments } from '@/utility/functions/fetch/getAllAppointments';
import { getAllServices } from '@/utility/functions/fetch/getAllServices';
import { getAllClients } from '@/utility/functions/fetch/getAllClients';

export default async function Page() {
  const { appointments } = await getAllAppointments('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { services } = await getAllServices('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');
  const { clients } = await getAllClients('user_01GWHJK2PJ3C1DGYJY32YSJFQ3');

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
          <Appointments appointments={appointments} services={services} clients={clients} />
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