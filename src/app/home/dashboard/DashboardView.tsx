'use client';

import styles from './dashboard.module.scss';
import { Appointments } from './appointments';
import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Stats } from './stats';
import { SecondaryHeader } from '@/components/SecondaryHeader';
import { useUser } from '@/app/Providers';

export default function DashboardView() {
  const { id } = useUser();
  return (
    <>
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
    </>
  )
}