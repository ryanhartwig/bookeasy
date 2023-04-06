import { Header } from "@/components/Header";
import { getAllBusinesses } from "@/utility/functions/fetch/getAllBusinesses";
import { getUser } from "@/utility/functions/fetch/getUserDetails";
import { userId } from "@/utility/sample_data/sample_userId";
import { TeamsView } from "./teamsView";


export default async function page() {

  const { data: teams} = await getAllBusinesses(userId);
  const { data: currentUser } = await getUser(userId);


  return (
    <>
      <Header text="Teams" />
      {currentUser ? <TeamsView teams={teams} currentUser={currentUser} />
      : <p style={{margin: 20}}>Loading team data...</p>}
    </>
  )
}