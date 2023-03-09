import styles from './card.module.scss';

import { DetailedHTMLProps, HTMLAttributes } from "react";

export const Card: React.FC<DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>> = ({children, ...props}) => {
  return (
    <div {...props} className={styles.card + ' ' + props.className ?? ''}>
      {children}
    </div>
  )
}