'use client';

import clsx from 'clsx';
import React, { useCallback, useState } from 'react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './setting.module.scss';

interface SettingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string,
  children?: React.ReactNode,
  /**
   * If provided, will use switch instead of 'Edit' button
   */
  toggleState?: boolean,
  /**
   * If provided, will override local editing functionality (useful for showing modal instead, etc)
   */
  onAction?: (...args: any) => any,
}

export const Setting = ({label, children, toggleState, onAction, ...props}: SettingProps) => {

  const [editing, setEditing] = useState<boolean>(false);
  const [value, setValue] = useState<string>('');

  const onEdit = useCallback(() => {
    if (onAction) return onAction();

    setEditing(true);
  }, [onAction]);

  const onSave = useCallback(() => {

  }, []);
  
  return (
    <div {...props} className={clsx(styles.Setting, props.className || '')}>
      <p className={styles.label}>{label}</p>
      <div className={styles.value}>
        {!editing ? children
        : <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} />}
      </div>
      
      {toggleState === undefined 
        ? <div className={clsx(styles.action, 'noselect')} >
            {!editing ? <p onClick={onEdit}>Edit</p>
            : <>
              <p style={{color: 'rgb(255, 104, 45)'}} onClick={() => setEditing(false)}>Cancel</p>
              <p onClick={onSave}>Save</p>
            </>
            }
          </div>
          
        : <div className={clsx(styles.action, 'noselect')} onClick={onAction}>
            <div className={clsx(styles.toggle, {[styles.on]: toggleState})}>
              <div className={clsx(styles.toggle_circle, {[styles.on]: toggleState})} />
            </div>
          </div>
      }
      
    </div>
  )
}