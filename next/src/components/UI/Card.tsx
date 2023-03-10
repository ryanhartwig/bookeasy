import styles from './card.module.scss';

import { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from 'clsx';
import React from 'react';

interface CardProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {};

const Card = React.forwardRef((props: CardProps, ref?: React.ForwardedRef<any>) => {
  const { children, ...rest } = props;
  
  return (
    <div {...rest} ref={ref} className={clsx(styles.card, {[`${rest.className}`]: !!rest.className})}>
      {children}
    </div>
  )
});

Card.displayName = 'Card';

export { 
  Card
};