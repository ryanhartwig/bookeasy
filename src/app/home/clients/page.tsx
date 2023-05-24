import { Header } from '@/components/Header';
import { ClientsView } from './clientsView';

export default function Page() {
  return (
    <>
      <Header text='Clients' />
      <ClientsView />
    </>
  )
}