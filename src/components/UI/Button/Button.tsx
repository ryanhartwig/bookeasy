import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './button.module.scss';

interface ButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  icon?: JSX.Element,
  children?: React.ReactNode,
}

export const Button: React.FC<ButtonProps> = ({icon, children, ...props}) => {

  return (
    <div {...props} className={clsx(styles.button, props.className ?? '')}>
      {icon && <div>{icon}</div>}
      <p>{children}</p>
    </div>
  )
}