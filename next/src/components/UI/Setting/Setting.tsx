import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './setting.module.scss';

interface SettingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string,
  children?: JSX.Element | never[],
  toggle?: boolean,
}

export const Setting: React.FC<SettingProps> = ({label, children, toggle = false}) => {

  return (
    <div className={styles.Setting}>
      {children}
    </div>
  )
}