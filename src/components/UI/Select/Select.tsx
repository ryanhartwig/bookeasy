import styles from './select.module.scss';

import { BsChevronDown } from 'react-icons/bs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickout } from '@/utility/hooks/useClickout';
import clsx from 'clsx';

interface SelectProps {
  list: JSX.Element[],
  placeholder?: string,
  selected?: JSX.Element,
  disabled?: boolean,
  hasSelected?: boolean,
}

export const Select: React.FC<SelectProps> = ({list, placeholder = "...", selected, disabled = false, hasSelected}) => {

  const [optionsShowing, setOptionsShowing] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(undefined!);
  const optionsRef = useRef<HTMLDivElement>(undefined!);

  useClickout(() => setOptionsShowing(false), optionsShowing, false, selectRef);
  
  useEffect(() => setOptionsShowing(false), [selected]);

  const showOptions = useCallback((e: any) => {
    if (!optionsRef.current) return setOptionsShowing(true);
    if (optionsRef.current.contains(e.target)) return;
    setOptionsShowing(p => !p);
  }, []);
  
  return (
    <div className={clsx(styles.input, {[styles.disabled]: disabled})} ref={selectRef} onClick={showOptions} >
      {hasSelected ? selected : <p>{placeholder}</p>}
      <div className={styles.down}>
        <BsChevronDown />
      </div>
      
      {optionsShowing && !disabled && 
        <div className={styles.options} ref={optionsRef}>
          {list.length ? list.map(option => (
            <div key={option.key} className={styles.option}>
              {option}
            </div>
          )) : <p className={styles.empty}>No options to show</p>}
        </div>
      }
    </div>
  )
}