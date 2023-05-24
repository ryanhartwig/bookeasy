import clsx from 'clsx';
import React, { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './loadingDots.module.scss';

interface LoadingDotsProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>
{
  size?: string | number,
}

export const LoadingDots: React.FC<LoadingDotsProps> = ({size = '3px', ...props}) => (
  <div {...props} className={clsx(styles.dots, props.className || '')}>
    <span style={{height: size, width: size}} />
    <span style={{height: size, width: size}} />
    <span style={{height: size, width: size}} />
  </div>
)