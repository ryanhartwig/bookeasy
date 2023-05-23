'use client';''

import { useCallback, useMemo, useState } from "react";
import { isValidEmail } from "@/utility/functions/validation/isValidEmail";
import { useMutation } from "@apollo/client";
import { REGISTER_USER_WITH_CREDENTIALS } from "@/utility/queries/userQueries";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from '../login.module.scss';
import zxcvbn from "zxcvbn";
import { Button } from "@/components/UI/Button/Button";

import Image from "next/image";

import Google from '@/assets/google.png';
import Facebook from '@/assets/facebook.png';
import { Input } from "@/components/UI/Input/Input";


type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = {
  nameError: string;
  emailError: string;
  passwordError: string;
  confirmPasswordError: string;
};

export default function Page() {
  const redirect = useRouter();
  
  const [loading, setLoading] = useState<boolean>(false);
  const [responseError, setResponseError] = useState<string>('');
  
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState<Errors>({
    nameError: '',
    emailError: '',
    passwordError: '',
    confirmPasswordError: ''
  });

  const passwordScore = useMemo(() => zxcvbn(formData.password.slice(0, 256)).score, [formData.password]);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [field]: value
    }));
    setErrors(prevErrors => ({
      ...prevErrors,
      [`${field}Error`]: '',
    }));
  };

  const validateField = (field: keyof FormData) => {
    let errorMessage = '';

    switch (field) {
      case 'name':
        if (!formData.name) {
          errorMessage = 'Please enter a name';
        }
        break;
      case 'email':
        if (!formData.email || !isValidEmail(formData.email)) {
          errorMessage = 'Please enter a valid email address';
        }
        break;
      case 'password':
        if (!formData.password) {
          errorMessage = 'Please enter a password';
        } else if (passwordScore < 2) {
          errorMessage = 'Please use a stronger password';
        }
        break;
      case 'confirmPassword':
        if (formData.confirmPassword !== formData.password) {
          errorMessage = 'Passwords do not match';
        }
        break;
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [`${field}Error`]: errorMessage
    }));
    return !errorMessage;
  };

  const [registerUser, { reset }] = useMutation(REGISTER_USER_WITH_CREDENTIALS);

  const resetAll = useCallback(() => {
    setFormData({name: '', email: '', password: '', confirmPassword: ''});
    setLoading(false);
    reset();
  }, [reset]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = true;
    ['name', 'email', 'password', 'confirmPassword'].forEach((field) => {
      if (!validateField(field as keyof FormData)) {
        valid = false;
      }
    });
    if (!valid) {
      return;
    }

    setLoading(true);    
    ;(async () => {
      try {
        await registerUser({
          variables: {
            credentials: {
              email: formData.email,
              name: formData.name,
              password: formData.password.slice(0, 256),
            }
          }
        });

        const response = await signIn('credentials', { redirect: false, email: formData.email, password: formData.password});
        if (!response || response.error) {
          return resetAll();
        };
        
        redirect.push('/home/dashboard');
      } catch(e: any) {  
        if (e.message.includes('e:USER_EXISTS')) {
          setResponseError('A user already exists with the specified email.');
        }
        resetAll();
      }
    })();
  };

  const [showStrength, setShowStrength] = useState<boolean>(false);
  const stages = ['grey', 'grey', 'rgb(205, 175, 109)', 'rgb(109, 205, 155)', 'rgb(205, 109, 189)'];
  
  return (
    <>
      <div className={styles.form}>
        <h3>Create an account</h3>
        <Button onClick={() => signIn('google', { callbackUrl: '/home/dashboard' })} icon={<Image src={Google} alt="Google logo" />}>Sign up with Google</Button>
        <Button onClick={() => signIn('facebook', { callbackUrl: '/home/dashboard' })} icon={<Image src={Facebook} alt="Facebook logo" />}>Sign up with Facebook</Button>
        
        <div className={styles.divider}>
          <hr />
          <p>or</p>
          <hr />
        </div>
        <Input
          disabled={loading}
          className={styles.input}
          value={formData.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Your name"
          errorOnFocusOnly={true}
          errorMessage={errors.nameError}
          required={!!errors.nameError}
          dark
        />
        <Input
          disabled={loading}
          className={styles.input}
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          errorOnFocusOnly={true}
          errorMessage={errors.emailError}
          required={!!errors.emailError}
          placeholder="Your email"
          dark
        />
        <Input
          disabled={loading}
          type="password"
          className={styles.input}
          value={formData.password}
          onChange={(e) => handleChange('password', e.target.value)}
          placeholder="Your password"
          errorOnFocusOnly={true}
          onFocus={() => setShowStrength(true)}
          onBlur={() => setShowStrength(false)}
          errorMessage={errors.passwordError}
          required={!!errors.passwordError}
          dark
        />
        <div className={styles.strength} style={{height: showStrength ? '10px' : 0}}>
          <div>
            <span className={styles.progress} style={{width: `${passwordScore * 25}%`, backgroundColor: stages[passwordScore]}} />
            <span className={styles.min} />
          </div>
        </div>
        <Input
          disabled={loading}
          type="password"
          className={styles.input}
          value={formData.confirmPassword}
          onChange={(e) => handleChange('confirmPassword', e.target.value)}
          placeholder="Confirm password"
          errorOnFocusOnly={true}
          errorMessage={errors.confirmPasswordError}
          required={!!errors.confirmPasswordError}
          dark
        />
  {/* <p>{`strength: ${zxcvbn(formData.password.slice(0, 256)).score}`}</p> */}

        {responseError && <p className={styles.error}>{responseError}</p>}
        <Button className={styles.create} style={{width: '55%', padding: '8px 0'}} onClick={handleSubmit}>Create Account</Button>
        <span className={styles.shadow} />
        
      </div>
      <div className={styles.navigate}>
        <Link href='login'>Existing user? Log in</Link>
      </div>
    </>
  );
}