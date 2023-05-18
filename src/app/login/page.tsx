'use client';

import { Input } from "@/components/UI/Input/Input";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from './login.module.scss';
import { SessionSample } from "./sessionSample";

export default function page() {


  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <p>Sample login</p>
        <br />
        <Input placeholder="Name" />
        <br />
        <Input placeholder="Email" />
        <br />
        <button onClick={() => signIn()}>Login</button>
        <br />
        <button onClick={() => signOut()}>Logout</button>
        <br />
        <SessionSample />
      </div>
    </div>
  )
}