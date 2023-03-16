import { Client } from '@/types/Client';
import styles from './tabs.module.scss';

interface ClientListProps {
  clients: Client[],
}

export const ClientList: React.FC<ClientListProps> = ({clients}) => {

  return (
    <div className={styles.clientlist}>
      <div className={styles.header}>
        {['Name', 'Appointments', 'Date Added', 'Active Client'].map(t => <p key={t}>{t}</p>)}
      </div>
      {clients.map(c => (
        <div key={c.id}>
          
        </div>
      ))}
    </div>
  )
}
