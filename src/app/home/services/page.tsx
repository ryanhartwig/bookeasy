import { Header } from "@/components/Header"
import { LoadingView } from "@/components/UI/LoadingView/LoadingView";
import styles from './services.module.scss';

export default function Page() {
  
  return <>
    <Header text="Services" loading />
    <div className={styles.services_page}>
      <div className={styles.labels}>
        {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
          <p key={t}>{t}</p>
        )}
      </div>
      <LoadingView text="Services" />
    </div>
  </>
}