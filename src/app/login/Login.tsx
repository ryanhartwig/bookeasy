'use client';

import { Input } from "@/components/UI/Input/Input"
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react"
import Google from '@/assets/google.png';
import Facebook from '@/assets/facebook.png';
import Image from "next/image";
import styles from './login.module.scss';
import { Button } from "@/components/UI/Button/Button";
import Link from "next/link";

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => setEmailError(''), [email]);
  useEffect(() => setPasswordError(''), [password]);
  
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const redirect = useRouter()

  const onSubmit = useCallback(() => {
    setError('');
    if (!email || !password) {
      !email && setEmailError('Please enter your email address');
      !password && setPasswordError('Please enter your password');
      return;
    }
    
    setLoading(true);
    ;(async() => {
      const response = await signIn('credentials', { redirect: false, email, password});
      if (!response) return;

      if (response.error) {
        setError('Invalid credentials');
        setLoading(false);
      }
      else if (response.url) {
        redirect.push('/home/dashboard');
      }
    })();
  }, [email, password, redirect]);

  return (
    <>
      <div className={styles.form}>
        <h3>Welcome back</h3>
        <Button onClick={() => signIn('google', { callbackUrl: '/home/dashboard' })} icon={<Image src={Google} alt="Google logo" />}>Log in with Google</Button>
        <Button onClick={() => signIn('facebook', { callbackUrl: '/home/dashboard' })} icon={<Image src={Facebook} alt="Facebook logo" />}>Log in with Facebook</Button>
        
        <div className={styles.divider}>
          <hr />
          <p>or</p>
          <hr />
        </div>

        <Input
          disabled={loading}
          onBlur={() => !email && setEmailError('Please enter your email address')}
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorOnFocusOnly={true}
          errorMessage={emailError}
          placeholder="Your email"
          required
          autoFocus
          dark
        />
        <Input
          disabled={loading}
          onBlur={() => !password && setPasswordError('Please enter your password')}
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorOnFocusOnly={true}
          errorMessage={passwordError}
          placeholder="Your password"
          type="password"
          required
          dark
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button className={styles.create} style={{width: '55%', padding: '8px 0'}} onClick={onSubmit}>Login</Button>
        <span className={styles.shadow} />
      </div>
      <div className={styles.navigate}>
        <Link href='login/register'>Create an account</Link>
      </div>
    </>
  )
}