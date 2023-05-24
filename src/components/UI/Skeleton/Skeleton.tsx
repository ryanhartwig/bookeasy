import clsx from 'clsx';
import { DetailedHTMLProps, FC, HTMLAttributes } from 'react';
import styles from './skeleton.module.scss';

interface SkeletonProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> 
{}

export const Skeleton: FC<SkeletonProps> = ({...props}) => (
  <div {...props} className={clsx(styles.loadingblock, props.className || '')} >
    <div className={styles.loadingswipe} />
    <div className={styles.loadingswipe} />
  </div>
) 