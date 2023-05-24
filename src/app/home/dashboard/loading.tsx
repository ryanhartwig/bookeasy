import { Header } from "@/components/Header"
import { SecondaryHeader } from "@/components/SecondaryHeader"
import { Card } from "@/components/UI/Card/Card";
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel"
import styles from './dashboard.module.scss';
import { WeekDayNames } from "./weekDayNames";

export default function Loading() {
  return (
    <>
      <Header text='Dashboard' loading />
      <SecondaryHeader>
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
            {/* <WeekDays userId={id} /> */}
          </Card>
        </div>
      </div>
    </>
  )
}