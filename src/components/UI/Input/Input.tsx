import clsx from 'clsx';
import React, { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { BiErrorCircle } from 'react-icons/bi';
import styles from './Input.module.scss';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
  errorMessage?: string,
}

export const Input: React.FC<InputProps> = ({errorMessage, ...props}) => {

  return (
    <div className={styles.inputWrapper}>
      {errorMessage && <div className={styles.errorMessage}>
        <BiErrorCircle fontSize={14} style={{marginRight: 8}} />
        <p>{errorMessage}</p>
      </div>}
      <input {...props} className={clsx(styles.input, props.className || '', {[styles.checkbox]: props.type === 'checkbox'}, {[styles.invalid]: !!errorMessage})} />
    </div>
  )
}