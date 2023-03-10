import styles from './card.module.scss';

import { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from 'clsx';

export const Card: React.FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({children, ...props}) => {
  return (
    <div {...props} className={clsx(styles.card, {[`${props.className}`]: !!props.className})}>
      {children}
    </div>
  )
}