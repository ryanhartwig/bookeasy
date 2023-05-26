'use client';

import { useState } from "react";
import { Login } from "./Login";
import Register from "./register";

export default function Page() {
  const [login, setLogin] = useState(true);


  return (
    <>
      {login 
        ? <Login onNavigate={() => setLogin(false)} />
        : <Register onNavigate={() => setLogin(true)} />
      }
    </>
  )
}