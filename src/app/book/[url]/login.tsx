import { Button } from '@/components/UI/Button/Button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from './book.module.scss';
import Image from 'next/image';
import Google from '@/assets/google.png';
import Facebook from '@/assets/facebook.png';
import * as bookit from '@/assets/logo_temp.svg';
import { LoadingSplash } from '@/components/UI/LoadingSplash/LoadingSplash';

interface LoginProps {
  url: string
}

export const Login: React.FC<LoginProps> = ({url}) => {
  const [loadingElement, setLoadingElement] = useState<string>('');
  const callbackUrl = `http://localhost:3000/book/${url}`;
  
  return (
  <div className={styles.background}>
    <LoadingSplash />
    <div className={styles.loginForm}>
      <div className={styles.formTitle}>
        <hr />
        <p>Login to continue</p>
        <hr />
      </div>
      <Button className={styles.loginButton}
        loading={loadingElement === 'google'}
        onClick={() => {
          setLoadingElement('google')
          signIn('google', { callbackUrl });
        }} 
        light
        style={{borderRadius: 30, padding: 12}}
        icon={<Image src={Google} alt="Google logo" />}
      >Log in with Google</Button>
      <Button className={styles.loginButton}
        loading={loadingElement === 'facebook'}
        onClick={() => {
          setLoadingElement('facebook')
          signIn('facebook', { callbackUrl });
        }} 
        light
        style={{borderRadius: 30, padding: 12}}
        icon={<Image src={Facebook} alt="Facebook logo" />}
      >Log in with Facebook</Button>

      <div className={styles.logo}>
        <Image className='Navigator_logo_icon' priority src={bookit.default} alt="Book it logo" />
      </div>
    </div>
  </div>
)}