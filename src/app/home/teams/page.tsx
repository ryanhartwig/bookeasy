import { Header } from "@/components/Header";
import { userId } from "@/utility/sample_data/sample_userId";
import { TeamsView } from "./teamsView";


export default function page() {

  return (
    <>
      <Header text="Teams" />
      <TeamsView userId={userId} />
    </>
  )
}