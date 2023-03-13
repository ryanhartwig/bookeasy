'use client';

import { Clients } from './clients';
import { Details } from './details';
import styles from './clients.module.scss';
import { useState } from 'react';
import { Client } from '@/types/Client';

export default function Page() {
  
  const [selected, setSelected] = useState<Client>();
  
  return (
    <div className={styles.wrapper}>
      <Clients selected={selected} setSelected={setSelected} />
      <Details selected={selected} />
    </div>
  )
}