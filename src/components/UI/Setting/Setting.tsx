'use client';

import { MutationFunctionOptions, OperationVariables, DefaultContext, ApolloCache } from '@apollo/client';
import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './setting.module.scss';

import { MoonLoader } from 'react-spinners';
import { useClickout } from '@/utility/hooks/useClickout';

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
  value?: string,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  onSave?: (...args: any) => Promise<any>,
}

export const Setting = ({label, children, toggleState, onAction, value, setValue, onSave, ...props}: SettingProps) => {

  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const settingRef = useRef<HTMLDivElement>(undefined!);

  const onClose = useClickout({
    onClickout: () => {
      if (onAction) return;
      setEditing(false);
      setValue && setValue('');
    },
    enabled: editing,
    contentRefs: [settingRef],
  })

  const onEdit = useCallback((e: any) => {
    if (onAction) return onAction();
    if (!setEditing) return;
    setEditing(true);
  }, [onAction, setEditing]);

  const handleSave = useCallback(() => {
    if (!onSave) return;
    if (!value) return;

    setLoading(true);

    ;(async () => {
      await onSave();
      setLoading(false);
      setEditing(false);
      setValue && setValue('');
    })();
  }, [onSave, setValue, value]);

  const onKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter' && editing) handleSave();
  }, [editing, handleSave]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  
  return (
    <div {...props} className={clsx(styles.Setting, props.className || '', {[styles.loading]: loading})} ref={settingRef}>
      <p className={styles.label}>{label}</p>
      <div className={styles.value}>
        {!editing ? children
        : <input placeholder={props.placeholder} autoFocus className={styles.editInput} onFocus={(e) => e.target.select()} value={value} onChange={(e) => setValue && setValue(e.target.value)} />}
      </div>
      
      {toggleState === undefined 
        ? <div className={clsx(styles.action, 'noselect')} >
            {!editing ? <p onClick={onEdit}>Edit</p>
            : <>
              {loading && <MoonLoader color='#000000' size={15} cssOverride={{marginRight: 10}} />}
              <p style={{color: 'rgb(255, 104, 45)'}} onClick={() => {
                setEditing && setEditing(false);
                setValue && setValue('');
                onClose();
              }}>Cancel</p>
              <p onClick={handleSave}>Save</p>
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