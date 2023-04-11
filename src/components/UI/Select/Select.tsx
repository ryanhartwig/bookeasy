import styles from './select.module.scss';

interface SelectProps {
  list: JSX.Element[]
}

export const Select: React.FC<SelectProps> = ({list}) => {
  return (
    <div className={styles.input}>
      {...list}
    </div>
  )
}