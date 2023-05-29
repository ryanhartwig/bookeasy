import { Header } from "@/components/Header";
import styles from './dashboard.module.scss';
import { RegisterTeam } from "./registerteam";
import { SecondaryHeader } from "@/components/SecondaryHeader";
import { Card } from "@/components/UI/Card/Card";
import { SectionLabel } from "@/components/UI/SectionLabel/SectionLabel";
import { Appointments } from "./appointments";
import { Stats } from "./stats";
import { WeekDayNames } from "./weekDayNames";
import { WeekDays } from "./weekDays";

export default function Page() {
  
  return (
    <>
      <RegisterTeam />
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
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
      </div>
    </>
  )
} 