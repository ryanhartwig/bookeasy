import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import { Spinner } from '../Spinner/Spinner';
import styles from './button.module.scss';

interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon?: JSX.Element,
  children?: React.ReactNode,
  loading?: boolean,
  light?: boolean,
  fontSize?: string | number,
}

export const Button: React.FC<ButtonProps> = ({icon, fontSize = 14, children, loading = false, light = false, ...props}) => {
  
  return (
    <div {...props} 
      tabIndex={0} 
      onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()} 
      className={clsx(styles.button, props.className ?? '', {[styles.loading]: loading}, {[styles.light]: light})}
    >
      {icon && <div>{icon}</div>}
      <p style={{fontSize}}>{children}</p>
      {loading && <Spinner style={{position: 'absolute', left: 'calc(100% + 15px)'}} />}
    </div>
  )
}