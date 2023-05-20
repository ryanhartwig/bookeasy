'use client';

import { Header } from '@/components/Header';
import styles from './services.module.scss';
import { BusinessesList } from './businessesList';
import { useUser } from '@/app/Providers';

export default function Page() {
  const { id } = useUser();

  return (
    <>
      <Header text='Services' />
      <div className={styles.services_page}>
        <div className={styles.labels}>
          {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
            <p key={t}>{t}</p>
          )}
        </div>
        <BusinessesList userId={id} />
      </div>
    </>
  )
}