import styles from './dashboard.module.scss';

import { Appointments } from './appointments';
import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Header } from '@/components/Header';
import { Stats } from './stats';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';



export default async function Page() {

  const session = await getServerSession(authOptions);

  if (!session) return;

  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <SecondaryHeader>
          <Stats userId={session.user.id} />
        </SecondaryHeader>
        <div className={styles.content}>
          <SectionLabel label='Today' />
          <Appointments userId={session.user.id}/>
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames />
            <WeekDays userId={session.user.id} />
          </Card>
        </div>
      </div>
    </>
  )
}