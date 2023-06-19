import { Input } from "@/components/UI/Input/Input"
import { signIn } from "next-auth/react";
import { useCallback, useEffect, useState } from "react"
import Google from '@/assets/google.png';
import Facebook from '@/assets/facebook.png';
import Image from "next/image";
import styles from './login.module.scss';
import { Button } from "@/components/UI/Button/Button";
import clsx from "clsx";
import { isValidEmail } from "@/utility/functions/validation/isValidEmail";

interface LoginProps {
  onNavigate: (...args: any) => any,
  callbackUrl: string,
}

export const Login: React.FC<LoginProps> = ({onNavigate, callbackUrl}) => {
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');

  useEffect(() => setEmailError(''), [email]);
  useEffect(() => setPasswordError(''), [password]);
  
  const [error, setError] = useState<string>('');
  const [loadingElement, setLoadingElement] = useState<string>('');

  const onSubmit = useCallback(() => {
    setError('');
    if (!email || !password || !isValidEmail(email)) {
      (!email || !isValidEmail(email)) && setEmailError('Please enter a valid email address');
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
    })();
  }, [email, password]);

  return (
    <>
      <div className={clsx(styles.form, {[styles.loading]: !!loadingElement})}>
        <h3>Welcome back</h3>
        <Button loading={loadingElement === 'google'}
          onClick={() => {
            setLoadingElement('google')
            signIn('google', { callbackUrl });
          }} 
          icon={<Image src={Google} alt="Google logo" />}
        >Log in with Google</Button>
        <Button loading={loadingElement === 'facebook'}
          onClick={() => {
            setLoadingElement('facebook')
            signIn('facebook', { callbackUrl });
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
      <div className={styles.navigate} >
        <p tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()} onClick={onNavigate}>Create an account</p>
      </div>
    </>
  )
}