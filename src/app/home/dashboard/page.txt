import styles from './dashboard.module.scss';
import { Header } from '@/components/Header';
import DashboardView from './DashboardView';

export default function Page() {
  
  return (
    <>
      <Header text='Dashboard' />
      <div id="dashboard" className={styles.dashboard}>
        <DashboardView />
      </div>
    </>
  )
}