import { Header } from '@/components/Header';
import styles from './services.module.scss';
import { BusinessesList } from './businessesList';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Page() {

  const session = await getServerSession(authOptions);
  if (!session) return;

  return (
    <>
      <Header text='Services' />
      <div className={styles.services_page}>
        <div className={styles.labels}>
          {['Name', 'Duration', 'Provider', 'Assignee(s)', 'Cost'].map((t) => 
            <p key={t}>{t}</p>
          )}
        </div>
        <BusinessesList userId={session.user.id} />
      </div>
    </>
  )
}