'use client';

import { SectionLabel } from '@/components/UI/SectionLabel';
import { useEffect, useMemo, useState } from 'react';
import styles from './page.module.scss';
import { sample_clients } from '@/utility/sample_data/sample_clients';


export const Clients = () => {

  const teams = useMemo<Set<string>>(() => new Set(sample_clients.map(c => c.team)), []);
  const [query, setQuery] = useState<string>('');


  return (
    <div className={styles.clients}>

    </div>
  )
}