import clsx from 'clsx';
import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
}

export const Input: React.FC<InputProps> = ({...props}) => {

  return (
    <input {...props} className={clsx('input', props.className || '')} />
  )
}