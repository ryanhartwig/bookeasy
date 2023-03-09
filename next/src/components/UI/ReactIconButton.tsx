import clsx from 'clsx';
import React from 'react';
import './ReactIconButton.css';

interface ReactIconButtonProps {
  children?: React.ReactNode,
  className?: string,
  style?: React.CSSProperties,
  onClick?: (...args: any) => any,
  text?: string,
  buttonSize?: string,
  fontSize?: string,
  active?: boolean,
}

export const ReactIconButton = ({children, fontSize, active = false, buttonSize, className = '', style, onClick, text}: ReactIconButtonProps) => {

  const size = {
    maxHeight: buttonSize,
    minHeight: buttonSize,
    maxWidth: buttonSize,
    minWidth: buttonSize,
  }
  
  return (
    <div style={{...size, ...style}} onClick={onClick} className={clsx('ReactIconButton', {active: active})}>
      {children}
      {text && <p className='rib-text noselect' style={{fontSize}}>{text}</p>}
    </div>
  )
}