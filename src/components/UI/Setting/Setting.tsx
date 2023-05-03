'use client';

import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';
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
  editing?: boolean,
  setEditing?: React.Dispatch<React.SetStateAction<boolean>>,
  value?: string,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  onSave?: (...args: any) => any,
}

export const Setting = ({label, children, toggleState, onAction, editing, setEditing, value, setValue, onSave, ...props}: SettingProps) => {


  const onEdit = useCallback(() => {
    if (onAction) return onAction();
    if (!setEditing) return;
    setEditing(true);
  }, [onAction, setEditing]);
  
  return (
    <div {...props} className={clsx(styles.Setting, props.className || '')}>
      <p className={styles.label}>{label}</p>
      <div className={styles.value}>
        {!editing ? children
        : <input autoFocus onFocus={(e) => e.target.select()} value={value} onChange={(e) => setValue && setValue(e.target.value)} />}
      </div>
      
      {toggleState === undefined 
        ? <div className={clsx(styles.action, 'noselect')} >
            {!editing ? <p onClick={onEdit}>Edit</p>
            : <>
              <p style={{color: 'rgb(255, 104, 45)'}} onClick={() => setEditing && setEditing(false)}>Cancel</p>
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