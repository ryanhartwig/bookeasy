import { Header } from "@/components/Header";
import DashboardView from "./DashboardView";
import styles from './dashboard.module.scss';
import { RegisterTeam } from "./registerteam";

export default function Page() {
  
  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <DashboardView />
      </div>
      <RegisterTeam />
    </>
  )
} 