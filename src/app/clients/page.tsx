'use client';

import { Clients } from './clients';
import { Details } from './details';
import styles from './clients.module.scss';
import { useState } from 'react';
import { Client } from '@/types/Client';
import { Header } from '@/components/Header';

export default function Page() {
  
  const [selected, setSelected] = useState<Client>();
  
  return (
    <>
      <Header text='Clients' />
      <div className={styles.wrapper}>
        <Clients selected={selected} setSelected={setSelected} />
        {selected ? <Details selected={selected} />
          : <p style={{width: '100%', padding: 20, fontWeight: 300, fontSize: 14, color: 'grey'}}>Select a client to see details</p>}
      </div>
    </>
  )
}