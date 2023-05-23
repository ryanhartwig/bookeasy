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
import clsx from "clsx";

export const Login = () => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => setEmailError(''), [email]);
  useEffect(() => setPasswordError(''), [password]);
  
  const [error, setError] = useState<string>('');
  const [loadingElement, setLoadingElement] = useState<string>('');

  const redirect = useRouter()

  const onSubmit = useCallback(() => {
    setError('');
    if (!email || !password) {
      !email && setEmailError('Please enter your email address');
      !password && setPasswordError('Please enter your password');
      return;
    }
    
    setLoadingElement('login');

    ;(async() => {
      const response = await signIn('credentials', { redirect: false, email, password});
      if (!response) return;

      if (response.error) {
        setError('Invalid credentials');
        setLoadingElement('');
      }
      else if (response.url) {
        redirect.push('/home/dashboard');
      }
    })();
  }, [email, password, redirect]);

  return (
    <>
      <div className={clsx(styles.form, {[styles.loading]: !!loadingElement})}>
        <h3>Welcome back</h3>
        <Button loading={loadingElement === 'google'}
          onClick={() => {
            setLoadingElement('google')
            signIn('google', { callbackUrl: '/home/dashboard' });
          }} 
          icon={<Image src={Google} alt="Google logo" />}
        >Log in with Google</Button>
        <Button loading={loadingElement === 'facebook'}
          onClick={() => {
            setLoadingElement('facebook')
            signIn('facebook', { callbackUrl: '/home/dashboard' });
          }} 
          icon={<Image src={Facebook} alt="Facebook logo" />}
        >Log in with Facebook</Button>
        
        <div className={styles.divider}>
          <hr />
          <p>or</p>
          <hr />
        </div>

        <Input
          className={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          errorOnFocusOnly={true}
          errorMessage={emailError}
          placeholder="Your email"
          required={!!emailError}
          dark
        />
        <Input
          className={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          errorOnFocusOnly={true}
          errorMessage={passwordError}
          placeholder="Your password"
          type="password"
          required={!!passwordError}
          dark
        />
        {error && <p className={styles.error}>{error}</p>}
        <Button loading={loadingElement === 'login'} 
          className={styles.create} 
          style={{width: '55%', padding: '8px 0'}} 
          onClick={onSubmit}
        >Login</Button>
      </div>
      <div className={styles.navigate}>
        <Link href='login/register'>Create an account</Link>
      </div>
    </>
  )
}