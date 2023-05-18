import { useSession } from "next-auth/react"

export const SessionSample = () => {
  const { data: session } = useSession();

  console.log(session);
  return (
    <div>
      <p>{session?.user?.email}</p>
    </div>
  )
}