'use client';

import clsx from 'clsx';
import React from 'react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './setting.module.scss';

interface SettingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string,
  children?: React.ReactNode,
  /**
   * If provided, will use switch instead of 'Edit' button
   */
  toggleState?: boolean,
  onAction?: (...args: any) => any,
}

export const Setting = ({label, children, toggleState, onAction, ...props}: SettingProps) => {

  return (
    <div {...props} className={clsx(styles.Setting, props.className || '')}>
      <p className={styles.label}>{label}</p>
      <div className={styles.value}>
        {children}
      </div>
      <div className={clsx(styles.action, 'noselect')} onClick={onAction}>
        {toggleState === undefined 
          ? <p>Edit</p>
          : <div className={clsx(styles.toggle, {[styles.on]: toggleState})}>
              <div className={clsx(styles.toggle_circle, {[styles.on]: toggleState})} />
            </div>
        }
      </div>
    </div>
  )
}