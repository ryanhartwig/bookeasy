import styles from './select.module.scss';

import { BsChevronDown } from 'react-icons/bs';

interface SelectProps {
  list: JSX.Element[],
  placeholder?: string,
}

export const Select: React.FC<SelectProps> = ({list, placeholder = ""}) => {
  return (
    <div className={styles.input}>
      <p>{placeholder}</p>
      <div className={styles.down}>
        <BsChevronDown />
      </div>
    </div>
  )
}