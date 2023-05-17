import { Client } from "@/types/Client"
import { GET_CLIENT_APPOINTMENT_COUNT } from "@/utility/queries/clientQueries";
import { useQuery } from "@apollo/client";
import { Avatar } from "../UI/Avatar/Avatar";
import { TextButton } from "../UI/TextButton/TextButton";
import styles from './tabs.module.scss';


interface ClientDetailsProps {
  client: Client,
  setSelectedClient: React.Dispatch<React.SetStateAction<Client | undefined>>,
}

export const ClientDetails: React.FC<ClientDetailsProps> = ({client, setSelectedClient}) => {

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
        <TextButton style={{width: '100%'}} onClick={() => setSelectedClient(client)}>Edit</TextButton>
      </div>
    </div>
  )
}