import { SectionLabel } from '@/components/UI/SectionLabel';
import styles from './services.module.scss';

export default function Page() {

  
  return (
    <div className={styles.services}>
      <div className={styles.labels}>
        {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
          <p key={t}>{t}</p>
        )}
      </div>
      <SectionLabel label='My Services' />
    </div>
  )
}