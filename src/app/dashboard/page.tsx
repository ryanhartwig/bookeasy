import styles from './dashboard.module.scss';

import { SecondaryHeader } from "../../components/SecondaryHeader"
import { getCurrentWeek } from '@/utility/functions/dateRanges/getCurrentWeek';
import { Appointments } from './appointments';

import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Header } from '@/components/Header';

import { getAllAppointments } from '@/utility/functions/fetch_old/getAllAppointments';
import { getAllServices } from '@/utility/functions/fetch_old/getAllServices';
import { getAllClients } from '@/utility/functions/fetch_old/getAllClients';
import { userId } from '@/utility/sample_data/sample_userId';
import { getDayRange } from '@/utility/functions/dateRanges/getDayRange';
import { inRange } from '@/utility/functions/dateRanges/inRange';
import { Stats } from './stats';
import { getAllBusinesses } from '@/utility/functions/fetch_old/getAllBusinesses';
import { getUserAvailability } from '@/utility/functions/fetch_old/getUserAvailability';

export default async function Page() {
  // Cached / deduped after first call in any server component
  const { data: services } = await getAllServices(userId);
  const { data: clients } = await getAllClients(userId);
  const { data: businesses } = await  getAllBusinesses(userId);
  const { data: availability} = await getUserAvailability(userId);

  const [start, end] = getCurrentWeek();
  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <SecondaryHeader>
          <Stats availability={availability} services={services} clients={clients} businesses={businesses} />
        </SecondaryHeader>
        <div className={styles.content}>
          <SectionLabel label='Today' />
          <Appointments userId={userId}/>
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames start={start} />
            <WeekDays userId={userId} />
          </Card>
        </div>
      </div>
    </>
  )
}