'use client';

import clsx from 'clsx';
import React, { DetailedHTMLProps, InputHTMLAttributes, useCallback, useEffect, useRef, useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import styles from './Input.module.scss';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMessage?: string,
  errorOnFocusOnly?: boolean,
  dark?: boolean,
}

export const Input: React.FC<InputProps> = ({errorMessage, errorOnFocusOnly, dark, ...props}) => {

  const inputRef = useRef<HTMLInputElement>(undefined!);
  const [inFocus, setInFocus] = useState<boolean>(false);

  const setFocus = useCallback((e: any, state: boolean) => {
    if (errorOnFocusOnly) setInFocus(state);
    state 
      ? props.onFocus && props.onFocus(e)
      : props.onBlur && props.onBlur(e)
    ;
  }, [errorOnFocusOnly, props]);

  return (
    <div className={clsx(styles.inputWrapper, props.className || '', {[styles.checkbox]: props.type === 'checkbox'})}>
      {errorMessage && (!errorOnFocusOnly || inFocus) && <div className={clsx(styles.errorMessage, {[styles.dark]: dark})}>
        <BiErrorCircle fontSize={14} style={{marginRight: 8}} />
        <p>{errorMessage}</p>
      </div>}
      {props.required && !props.value && <p className={styles.required}>*</p>}
      <input {...props} 
        onFocus={(e) => setFocus(e, true)} 
        onBlur={(e) => setFocus(e, false)} 
        ref={inputRef} 
        onKeyDown={(e) => props.type === 'checkbox' && e.key === 'Enter' && e.currentTarget.click()}
        className={clsx(styles.input, {[styles.dark]: dark} , {[styles.invalid]: !!errorMessage})} 
      />
    </div>
  )
}