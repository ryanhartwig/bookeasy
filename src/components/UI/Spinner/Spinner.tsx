import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './spinner.module.scss';

interface SpinnerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  size?: number | string,
}

export const Spinner: React.FC<SpinnerProps> = ({size = '', ...props}) => 
  <div {...props} 
    className={clsx(styles.spinner, props.className || '')}
    style={{height: size, width: size, ...props.style}}
  ></div>