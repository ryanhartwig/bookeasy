import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './textbutton.module.scss';

interface TextButtonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
  fontSize?: string | number,
  altColor?: boolean,
}

export const TextButton: React.FC<TextButtonProps> = ({children, fontSize, altColor = false, ...props}) => {

  const color = altColor
    ? '#ff462d'
    : '#216FDB';

  const backgroundColor = altColor
    ? '#ff462d19'
    : '#216fdb19'

  return (
    <div {...props} className={clsx(styles.action, props.className || '')} onKeyDown={(e) => e.key === 'Enter' && e.currentTarget.click()} tabIndex={0}>
      <p style={{color, backgroundColor, fontSize}} >{children}</p>
    </div>
  )
}