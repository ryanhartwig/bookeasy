import styles from './select.module.scss';

import { BsChevronDown } from 'react-icons/bs';
import { useCallback, useRef, useState } from 'react';
import { useClickout } from '@/utility/hooks/useClickout';

interface SelectProps {
  list: JSX.Element[],
  placeholder?: string,
}

export const Select: React.FC<SelectProps> = ({list, placeholder = ""}) => {

  const [optionsShowing, setOptionsShowing] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(undefined!);
  const optionsRef = useRef<HTMLDivElement>(undefined!);

  useClickout(() => setOptionsShowing(false), optionsShowing, selectRef);

  const showOptions = useCallback((e: any) => {
    if (!optionsRef.current) return setOptionsShowing(true);
    if (optionsRef.current.contains(e.target)) return;
    setOptionsShowing(p => !p);
  }, []);
  
  return (
    <div className={styles.input} ref={selectRef} onClick={showOptions} >
      <p>{placeholder}</p>
      <div className={styles.down}>
        <BsChevronDown />
      </div>
      
      {optionsShowing && 
        <div className={styles.options} ref={optionsRef}>
        
        </div>
      }
    </div>
  )
}