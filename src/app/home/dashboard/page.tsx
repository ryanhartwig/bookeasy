import styles from './dashboard.module.scss';


import { Appointments } from './appointments';
import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Header } from '@/components/Header';
import { userId } from '@/utility/sample_data/sample_userId';
import { Stats } from './stats';
import { SecondaryHeader } from '@/components/SecondaryHeader';

export default async function Page() {

  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <SecondaryHeader>
          <Stats userId={userId} />
        </SecondaryHeader>
        <div className={styles.content}>
          <SectionLabel label='Today' />
          <Appointments userId={userId}/>
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames />
            <WeekDays userId={userId} />
          </Card>
        </div>
      </div>
    </>
  )
}