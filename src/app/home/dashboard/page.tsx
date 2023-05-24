import { Header } from "@/components/Header"
import { SecondaryHeader } from "@/components/SecondaryHeader"
import { Card } from "@/components/UI/Card/Card";
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel"
import { Skeleton } from "@/components/UI/Skeleton/Skeleton";
import { getCurrentWeek } from "@/utility/functions/dateRanges/getCurrentWeek";
import styles from './dashboard.module.scss';
import { WeekDayNames } from "./weekDayNames";

export default function Page() {
  const [start, end] = getCurrentWeek();
  
  return (
    <>
      <Header text='Dashboard' loading />
      <SecondaryHeader>
        <div className={styles.header}>
        <div className={styles.stat}>
          <p style={{fontWeight: 100}}>Week of</p>
          <p className={styles.headerLarge}>
            {`${start.toDateString().split(' ').slice(1, 3).join(' ')}`} - {`${end.toDateString().split(' ').slice(1, 3).join(' ')}`}
          </p>
        </div>
        <div className={styles.stat}>
          <p className={styles.headerLarge}>0</p>
          <p style={{fontWeight: 100}}>Appointments</p>
        </div>
        <div className={styles.stat}>
          <p className={styles.headerLarge}>$0.00</p>
          <p style={{fontWeight: 100}}>Projected</p>
        </div>
        <div className={styles.addApointment}>
          <Skeleton />
        </div>
      </div>
      </SecondaryHeader>
      <div id="dashboard" className={styles.dashboard}>
        <div className={styles.content}>
          <SectionLabel label='Today' />
          <div className={styles.appointments}>
            <p className={styles.no_apps}>No appointments to show</p>
          </div>
          <SectionLabel label='This Week' />
          <Card className={styles.weekview_card}>
            <WeekDayNames />
            <Skeleton />
          </Card>
        </div>
      </div>
    </>
  )
}