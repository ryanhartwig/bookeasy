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
import { inRange } from '@/utility/functions/inRange';
import { getDayRange } from '@/utility/functions/getDayRange';
import { userId } from '@/utility/sample_data/sample_userId';

export default async function Page() {
  // Cached / deduped after first call in any server component
  const { data: appointments } = await getAllAppointments(userId);
  const { data: services } = await getAllServices(userId);
  const { data: clients } = await getAllClients(userId);

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
          <Appointments appointments={appointments.filter(app => inRange(getDayRange(), app.startDate))} services={services} clients={clients} />
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames start={start} />
            <WeekDays appointments={appointments.filter(app => inRange([start.getTime(), end.getTime()], app.startDate))} services={services} clients={clients} />
          </Card>
        </div>
      </div>
    </>
  )
}