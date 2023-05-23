import { NewBusiness } from "@/types/Business"
import { Client } from "@/types/Client";
import { Service } from "@/types/Service";
import { Staff } from "@/types/User";
import { Avatar } from "@/components/UI/Avatar/Avatar";

interface OverviewProps {
  selected: NewBusiness,
  members: Staff[],
  clients: Client[],
  services: Service[],
}

export const Overview: React.FC<OverviewProps> = ({selected, members, clients, services}) => {

  return (
    <>
      <Avatar src={selected.avatar} size={120} style={{margin: '0 auto'}} useTeamIcon />
      <h2>{selected.name}</h2>
      <hr />
      <div>
        <div>
          <p>{members.length}</p>
          <p>member(s)</p>
        </div>
        <div>
          <p>{clients.length}</p>
          <p>client(s)</p>
        </div>
        <div>
          <p>{services.filter(s => !s.deleted).length}</p>
          <p>service(s)</p>
        </div>
      </div>
    </>
  )
}