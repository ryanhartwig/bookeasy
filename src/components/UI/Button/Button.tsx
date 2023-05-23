import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './button.module.scss';

interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon?: JSX.Element,
  children?: React.ReactNode,
  loading?: boolean,
}

export const Button: React.FC<ButtonProps> = ({icon, children, loading = true, ...props}) => {
  
  return (
    <div {...props} 
      tabIndex={0} 
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()} 
      className={clsx(styles.button, props.className ?? '', {[styles.loading]: loading})}
    >
      {icon && <div>{icon}</div>}
      <p>{children}</p>
      <div className={styles.spinner}></div>
    </div>
  )
}