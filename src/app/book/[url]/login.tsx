import { Button } from '@/components/UI/Button/Button';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import styles from './book.module.scss';
import Image from 'next/image';
import Google from '@/assets/google.png';
import Facebook from '@/assets/facebook.png';

interface LoginProps {
  url: string
}

export const Login: React.FC<LoginProps> = ({url}) => {
  const [loadingElement, setLoadingElement] = useState<string>('');
  const callbackUrl = `http://localhost:3000/book/${url}`;
  
  return (
  <div className={styles.background}>
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
        icon={<Image src={Google} alt="Google logo" />}
      >Log in with Google</Button>
      <Button className={styles.loginButton}
        loading={loadingElement === 'facebook'}
        onClick={() => {
          setLoadingElement('facebook')
          signIn('facebook', { callbackUrl });
        }} 
        icon={<Image src={Facebook} alt="Facebook logo" />}
      >Log in with Facebook</Button>
    </div>
  </div>
)}