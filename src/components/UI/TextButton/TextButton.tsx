import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './textbutton.module.scss';

interface TextButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
}

export const TextButton: React.FC<TextButtonProps> = ({...props}) => {

  return (
    <div {...props} className={clsx(styles.action, props.className || '')}>
      <p>Edit</p>
    </div>
  )
}