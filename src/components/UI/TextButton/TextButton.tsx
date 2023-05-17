import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './textbutton.module.scss';

interface TextButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
}

export const TextButton: React.FC<TextButtonProps> = ({children, ...props}) => {

  return (
    <div {...props} className={clsx(styles.action, props.className || '')}>
      <p>{children}</p>
    </div>
  )
}