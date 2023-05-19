'use client';

import { Input } from "@/components/UI/Input/Input";
import { isValidPassword } from "@/utility/functions/validation/isValidPassword";
import { useEffect, useMemo, useState } from "react";
import styles from '../login.module.scss';
import zxcvbn from "zxcvbn";
import { isValidEmail } from "@/utility/functions/validation/isValidEmail";

export default function Page() {

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [emailError, setEmailError] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [matchError, setMatchError] = useState<string>('');

  const trimmed = useMemo(() => password.slice(0, 256), [password]);
  const { score } = useMemo(() => zxcvbn(trimmed), [trimmed]);

  const validEmail = useMemo(() => isValidEmail(email), [email]);

  
  
  return (
    <div className={styles.form}>
      <p>Create an account</p>
      <Input className={styles.input} value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoFocus />
      <Input className={styles.input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" />
      <Input onBlur={() => score < 2 && setPasswordError('Please use a stronger password')} 
        type='password' 
        className={styles.input} 
        value={password} 
        onChange={(e) => setPassword(e.target.value)} 
        placeholder="Your password" 
        errorOnFocusOnly={true}
        errorMessage={passwordError}
      />
      <Input onBlur={() => confirmPassword && password !== confirmPassword && setMatchError('Passwords do not match')} 
        type='password' 
        className={styles.input} 
        value={confirmPassword} 
        onChange={(e) => setConfirmPassword(e.target.value)} 
        placeholder="Confirm password" 
        errorMessage={matchError}
      />
      <br />
      <button>Create Account</button>
      <br />

      <p>{'strength: ' + score}</p>
    </div>
  )
} 