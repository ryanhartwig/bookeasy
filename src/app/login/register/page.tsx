'use client';''

import { Input } from "@/components/UI/Input/Input";
import { useState } from "react";
import styles from '../login.module.scss';
import zxcvbn from "zxcvbn";
import { isValidEmail } from "@/utility/functions/validation/isValidEmail";

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
        const trimmed = formData.password.slice(0, 256);
        const { score } = zxcvbn(trimmed);
        if (!formData.password) {
          errorMessage = 'Please enter a password';
        } else if (score < 2) {
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
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    ['name', 'email', 'password', 'confirmPassword'].forEach((field) => validateField(field as keyof FormData));
    if (Object.values(errors).some(v => !!v)) {
      return;
    }


  };

  return (
    <div className={styles.form}>
      <p>Create an account</p>
      <Input
        onBlur={() => validateField('name')}
        className={styles.input}
        value={formData.name}
        onChange={(e) => handleChange('name', e.target.value)}
        placeholder="Your name"
        errorOnFocusOnly={true}
        errorMessage={errors.nameError}
        required
        autoFocus
      />
      <Input
        onBlur={() => validateField('email')}
        className={styles.input}
        value={formData.email}
        onChange={(e) => handleChange('email', e.target.value)}
        errorOnFocusOnly={true}
        errorMessage={errors.emailError}
        placeholder="Your email"
        required
      />
      <Input
        onBlur={() => validateField('password')}
        type="password"
        className={styles.input}
        value={formData.password}
        onChange={(e) => handleChange('password', e.target.value)}
        placeholder="Your password"
        errorOnFocusOnly={true}
        errorMessage={errors.passwordError}
        required
      />
      <Input
        onBlur={() => validateField('confirmPassword')}
        type="password"
        className={styles.input}
        value={formData.confirmPassword}
        onChange={(e) => handleChange('confirmPassword', e.target.value)}
        placeholder="Confirm password"
        errorOnFocusOnly={true}
        errorMessage={errors.confirmPasswordError}
        required
      />
      <br />
      <button onClick={handleSubmit}>Create Account</button>
      <br />

      <p>{`strength: ${zxcvbn(formData.password.slice(0, 256)).score}`}</p>
    </div>
  );
}