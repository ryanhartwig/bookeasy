'use client';

import { useUser } from '@/app/Providers';
import { Header } from '@/components/Header';
import { ClientsView } from './clientsView';

export default function Page() {
  const { id } = useUser();
  return (
    <>
      <Header text='Clients' />
      <ClientsView userId={id} />
    </>
  )
}