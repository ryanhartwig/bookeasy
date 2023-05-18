import { Header } from '@/components/Header';
import styles from './services.module.scss';
import { userId } from '@/utility/sample_data/sample_userId';
import { BusinessesList } from './businessesList';

export default function Page() {

  return (
    <>
      <Header text='Services' />
      <div className={styles.services_page}>
        <div className={styles.labels}>
          {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
            <p key={t}>{t}</p>
          )}
        </div>
        <BusinessesList userId={userId} />
      </div>
    </>
  )
}