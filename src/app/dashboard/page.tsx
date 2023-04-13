import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import { Appointments } from './appointments';

import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Header } from '@/components/Header';

import { getAllAppointments } from '@/utility/functions/fetch/getAllAppointments';
import { getAllServices } from '@/utility/functions/fetch/getAllServices';
import { getAllClients } from '@/utility/functions/fetch/getAllClients';
import { userId } from '@/utility/sample_data/sample_userId';
import { getDayRange } from '@/utility/functions/dateRanges/getDayRange';
import { inRange } from '@/utility/functions/dateRanges/inRange';
import { Stats } from './stats';
import { getAllBusinesses } from '@/utility/functions/fetch/getAllBusinesses';

export default async function Page() {
  // Cached / deduped after first call in any server component
  const { data: appointments } = await getAllAppointments(userId);
  const { data: services } = await getAllServices(userId);
  const { data: clients } = await getAllClients(userId);
  const { data: businesses } = await  getAllBusinesses(userId);

  const [start, end] = getCurrentWeek();
  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <SecondaryHeader>
          <Stats services={services} clients={clients} appointments={appointments} businesses={businesses} />
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