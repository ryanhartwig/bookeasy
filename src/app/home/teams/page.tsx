import { Header } from "@/components/Header";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { TeamsView } from "./teamsView";


export default async function page() {

  const session = await getServerSession(authOptions);
  if (!session) return;

  return (
    <>
      <Header text="Teams" />
      <TeamsView userId={session.user.id} />
    </>
  )
}