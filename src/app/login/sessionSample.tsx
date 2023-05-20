'use client';

import { useSession } from "next-auth/react"

export const SessionSample = () => {
  const { data: session } = useSession();

  return (
    <div>
      <p>{session?.user?.email}</p>
    </div>
  )
}