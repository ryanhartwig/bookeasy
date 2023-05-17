'use client';

import clsx from 'clsx';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './setting.module.scss';

import { MoonLoader } from 'react-spinners';
import { useClickout } from '@/utility/hooks/useClickout';
import { testEmail } from '@/utility/functions/validation/testEmail';
import { BiErrorCircle } from 'react-icons/bi';
import { TextButton } from '../TextButton/TextButton';

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
  onEditOverride?: (...args: any) => any,
  onRemove?: (...args: any) => any,
  value?: string,
  /**
   * Will not prevent onSave() from being called if value is an empty string
   */
  allowEmptyValue?: boolean,
  setValue?: React.Dispatch<React.SetStateAction<any>>,
  onSave?: (...args: any) => Promise<any>,
  email?: boolean,
}

export const Setting = ({label, children, toggleState, onEditOverride, value, email, allowEmptyValue, setValue, onRemove, onSave, ...props}: SettingProps) => {

  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const settingRef = useRef<HTMLDivElement>(undefined!);

  const onClose = useClickout({
    onClickout: () => {
      if (onEditOverride) return;
      setEditing(false);
      setErrorMessage('');
      setValue && setValue('');
    },
    enabled: editing,
    contentRefs: [settingRef],
  });

  const onEdit = useCallback((e: any) => {
    if (onEditOverride) return onEditOverride();
    setEditing(true);
  }, [onEditOverride, setEditing]);

  const handleSave = useCallback(() => {
    if (!onSave) return;
    if (!allowEmptyValue && !value) {
      setErrorMessage('Please enter a value');
      return;
    };
    if (email && value && !testEmail(value)) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setLoading(true);

    ;(async () => {
      await onSave();
      setLoading(false);
      setEditing(false);
      setValue && setValue('');
      setErrorMessage('');
    })();
  }, [allowEmptyValue, email, onSave, setValue, value]);

  const onKeyDown = useCallback((e: any) => {
    if (e.key === 'Enter' && editing) handleSave();
    if (e.key === 'Escape' && editing) onClose();
  }, [editing, handleSave, onClose]);

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onKeyDown]);
  
  return (
    <div {...props} className={clsx(styles.Setting, props.className || '', {[styles.loading]: loading})} ref={settingRef}>
      <p className={styles.label}>{label}</p>
      <div className={styles.value}>
        {!editing ? children
        : <>
          {errorMessage && <div className={styles.errorMessage}>
            <BiErrorCircle fontSize={14} style={{marginRight: 8}} />
            <p>{errorMessage}</p>
          </div>}
          <input placeholder={props.placeholder} autoFocus className={clsx(styles.editInput, {[styles.invalid]: !!errorMessage})} onFocus={(e) => e.target.select()} value={value} onChange={(e) => setValue && setValue(e.target.value)} />
        </>}
      </div>
      
      {toggleState === undefined 
        ? <div className={clsx(styles.action, 'noselect')} >
            {!editing ? <>
              {onRemove && <TextButton altColor onClick={onRemove}>Remove</TextButton>}
              <TextButton onClick={onEdit}>Edit</TextButton>
            </>
            : <>
              {loading && <MoonLoader color='#000000' size={15} cssOverride={{marginRight: 10}} />}
              <TextButton altColor onClick={onClose}>Cancel</TextButton>
              <TextButton onClick={handleSave}>Save</TextButton>
            </>
            }
          </div>
          
        : <div className={clsx(styles.action, 'noselect')} onClick={onSave}>
            <div className={clsx(styles.toggle, {[styles.on]: toggleState})}>
              <div className={clsx(styles.toggle_circle, {[styles.on]: toggleState})} />
            </div>
          </div>
      }
      
    </div>
  )
}