import styles from './card.module.scss';

import { DetailedHTMLProps, HTMLAttributes } from "react";

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: React.ReactNode,
}

export const Card: React.FC<CardProps> = ({children, ...props}) => {


  return (
    <div {...props} className={styles.card + ' ' + props.className ?? ''}>
      {children}
    </div>
  )
}