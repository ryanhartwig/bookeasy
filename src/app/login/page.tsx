'use client';

import { Spinner } from "@/components/UI/Spinner/Spinner";
import { useSession } from "next-auth/react";
import { redirect, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Login } from "./Login";
import Register from "./register";

export default function Page() {
  const [login, setLogin] = useState(true);

  const params = useSearchParams();
  const redirectId = params?.get('redirect_id');
  const callbackUrl = useMemo(() => `/home/dashboard${redirectId ? `?redirect_id=${redirectId}` : ''}`, [redirectId]);

  console.log(process.env.NODE_ENV);
  console.log(process.env.VERCEL);
  console.log('user fro mclient: ', process.env.USER);
  
  const { data: session, status } = useSession();
  if (session) {
    redirect(callbackUrl);
  }

  if (status === 'loading') {
    return <Spinner />
  }

  return (
    <>
      {login
        ? <Login onNavigate={() => setLogin(false)} callbackUrl={callbackUrl} />
        : <Register onNavigate={() => setLogin(true)} callbackUrl={callbackUrl} />
      }
    </>
  )
}