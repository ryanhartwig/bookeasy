import { Client } from "@/types/Client"
import { GET_CLIENT_APPOINTMENT_COUNT } from "@/utility/queries/clientQueries";
import { useQuery } from "@apollo/client";
import { Avatar } from "../UI/Avatar/Avatar";
import styles from './tabs.module.scss';


interface ClientDetailsProps {
  client: Client,
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({client}) => {

  const { data: appointmentCountData } = useQuery(GET_CLIENT_APPOINTMENT_COUNT, { variables: { clientId: client.id }})
  

  return (
    <div className={styles.client} key={client.id}>
      <div>
        <Avatar src={client.avatar} size={28} />
      </div>
      <div>
        <p>{client.name}</p>
        <p>{!appointmentCountData ? '...' : appointmentCountData.getClientAppointmentCount}</p>
        <p>{new Date(client.joined_date).toDateString().split(' ').slice(1).join(' ')}</p>
        <div className={styles.edit}>
          <p>Edit</p>
        </div>
      </div>
    </div>
  )
}