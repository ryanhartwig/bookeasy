'use client';

import styles from './dashboard.module.scss';
import { Appointments } from './appointments';
import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Header } from '@/components/Header';
import { Stats } from './stats';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { useUser } from '@/app/Providers';

export default function Page() {
  const { id } = useUser();

  console.log(id);
  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <SecondaryHeader>
          <Stats userId={id} />
        </SecondaryHeader>
        <div className={styles.content}>
          <SectionLabel label='Today' />
          <Appointments userId={id}/>
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames />
            <WeekDays userId={id} />
          </Card>
        </div>
      </div>
    </>
  )
}