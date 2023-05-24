import { Header } from "@/components/Header"
import styles from './services.module.scss';

export default function Loading() {
  
  return <>
    <Header text="Services" loading />
    <div className={styles.services_page}>
      <div className={styles.labels}>
        {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
          <p key={t}>{t}</p>
        )}
      </div>
    </div>
  </>
}