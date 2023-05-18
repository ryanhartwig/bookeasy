import { Header } from '@/components/Header';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { ClientsView } from './clientsView';

export default async function Page() {
  
  const session = await getServerSession(authOptions);
  if (!session) return;

  return (
    <>
      <Header text='Clients' />
      <ClientsView userId={session.user.id} />
    </>
  )
}