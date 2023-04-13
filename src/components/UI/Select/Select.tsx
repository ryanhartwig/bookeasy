import styles from './select.module.scss';

import { BsChevronDown } from 'react-icons/bs';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useClickout } from '@/utility/hooks/useClickout';

interface SelectProps {
  list: JSX.Element[],
  placeholder?: string,
  selected?: JSX.Element,
}

export const Select: React.FC<SelectProps> = ({list, placeholder = "", selected}) => {

  const [optionsShowing, setOptionsShowing] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(undefined!);
  const optionsRef = useRef<HTMLDivElement>(undefined!);

  useClickout(() => setOptionsShowing(false), optionsShowing, selectRef);

  useEffect(() => {setOptionsShowing(false)}, [selected]);

  const showOptions = useCallback((e: any) => {
    if (!optionsRef.current) return setOptionsShowing(true);
    if (optionsRef.current.contains(e.target)) return;
    setOptionsShowing(p => !p);
  }, []);
  
  return (
    <div className={styles.input} ref={selectRef} onClick={showOptions} >
      {selected ? selected : <p>{placeholder}</p>}
      <div className={styles.down}>
        <BsChevronDown />
      </div>
      
      {optionsShowing && 
        <div className={styles.options} ref={optionsRef}>
          {list.map(option => (
            <div key={option.key} className={styles.option}>
              {option}
            </div>
          ))}
        </div>
      }
    </div>
  )
}