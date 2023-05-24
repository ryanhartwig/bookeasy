import clsx from 'clsx';
import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './spinner.module.scss';

interface SpinnerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {}

export const Spinner: React.FC<SpinnerProps> = ({...props}) => 
  <div {...props} className={clsx(styles.spinner, props.className || '')}></div>