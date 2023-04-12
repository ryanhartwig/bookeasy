import styles from './select.module.scss';

import { BsChevronDown } from 'react-icons/bs';
import { useState } from 'react';

interface SelectProps {
  list: JSX.Element[],
  placeholder?: string,
}

export const Select: React.FC<SelectProps> = ({list, placeholder = ""}) => {

  const [optionsShowing, setOptionsShowing] = useState<boolean>(false);
  
  return (
    <div className={styles.input}>
      <p>{placeholder}</p>
      <div className={styles.down}>
        <BsChevronDown />
      </div>
      
      {optionsShowing && <div className={styles.options}>
        
      </div>}
    </div>
  )
}