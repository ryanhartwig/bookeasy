import styles from './dashboard.module.scss';
import { Appointments } from './appointments';
import { WeekDayNames } from './weekDayNames';
import { WeekDays } from './weekDays';
import { Card } from '@/components/UI/Card/Card';
import { SectionLabel } from '@/components/UI/SectionLabel/SectionLabel';
import { Stats } from './stats';
import { SecondaryHeader } from '@/components/SecondaryHeader';

export default function DashboardView() {
  return (
    <>
      <SecondaryHeader>
        <Stats />
      </SecondaryHeader>
      <div className={styles.content}>
        <SectionLabel label='Today' />
        <Appointments />
        <SectionLabel label='This Week' />
        <Card className={styles.weekview_card}>
          <WeekDayNames />
          <WeekDays />
        </Card>
      </div>
    </>
  )
}