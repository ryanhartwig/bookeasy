import { Client } from "@/types/Client"
import { Avatar } from "../UI/Avatar/Avatar";
import styles from './tabs.module.scss';


interface ClientDetailsProps {
  client: Client,
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({client}) => {



  return (
    <div className={styles.client} key={client.id}>
      <div>
        <Avatar src={client.avatar} size={28} />
      </div>
      <div>
        <p>{client.name}</p>
        <p>{0}</p>
        <p>{new Date(client.joined_date).toDateString().split(' ').slice(1).join(' ')}</p>
        <p>Edit</p>
      </div>
    </div>
  )
}