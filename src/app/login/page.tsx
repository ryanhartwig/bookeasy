'use client';

import { redirect, usePathname, useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Login } from "./Login";
import Register from "./register";

export default function Page() {
  const params = useSearchParams()

  const [login, setLogin] = useState(true);
  const redirectId = params?.get('redirect_id');

  const callbackUrl = useMemo(() => `/home/dashboard${redirectId ? `?redirect_id=${redirectId}` : ''}`, [redirectId]);

  return (
    <>
      {login 
        ? <Login onNavigate={() => setLogin(false)} callbackUrl={callbackUrl} />
        : <Register onNavigate={() => setLogin(true)} callbackUrl={callbackUrl} />
      }
    </>
  )
}