import styles from './button.module.scss';

interface ButtonProps {
  icon?: JSX.Element,
  children?: React.ReactNode,
}

export const Button: React.FC<ButtonProps> = ({icon, children}) => {

  return (
    <div className={styles.button}>
      {icon && <div>{icon}</div>}
      <p>{children}</p>
    </div>
  )
}