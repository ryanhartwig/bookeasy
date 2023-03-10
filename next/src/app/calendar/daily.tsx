'use client'

import { Card } from '@/components/UI/Card';
import { Client } from '@/types/Client';
import { Service } from '@/types/Service';
import { sample_clients } from '@/utility/sample_data/sample_clients';
import { sample_services } from '@/utility/sample_data/sample_services';
import { useMemo, useEffect } from 'react';
import { Hours } from '../dashboard/hours';
import styles from './daily.module.scss';

export const Daily = () => {
  const services = useMemo( () => new Map<string, Service>(), []);
  const clients = useMemo(() => new Map<string, Client>(), []);

  useEffect(() => {
    sample_services.forEach(s => services.set(s.id, s));
    sample_clients.forEach(c => clients.set(c.id, c));
  }, [clients, services]);

  return (
    <div className={styles.daily}>
      <Card className={styles.day_wrapper} >
        <Hours services={services} clients={clients} appointments={[]} />
      </Card>
    </div>
    
  )
}