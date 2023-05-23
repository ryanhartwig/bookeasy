'use client';

import { useUser } from "@/app/Providers";
import { BusinessesList } from "./businessesList";
import styles from './services.module.scss';

export const ServicesView = () => {
  const { id } = useUser();

  return (
    <div className={styles.services_page}>
      <div className={styles.labels}>
        {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
          <p key={t}>{t}</p>
        )}
      </div>
      <BusinessesList userId={id} />
    </div>
  )
}


