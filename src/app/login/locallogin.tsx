'use client';

import { Input } from "@/components/UI/Input/Input"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react"

export const LocalLogin = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');

  const redirect = useRouter()

  const onSubmit = useCallback(() => {
    ;(async() => {
      const response = await signIn('credentials', { redirect: false, email, password});
      if (!response) return;

      if (response.error) {
        setError('Invalid credentials');
      }
      else if (response.url) {
        redirect.push('/home/dashboard');
      }
    })();
  }, [email, password, redirect]);

  return (
    <>
      <br />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
      <br />
      <Input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <br />
      <button onClick={onSubmit}>Sign in</button>
      <br />
      {error && <p>{error}</p>}
      <br />
    </>
  )
}