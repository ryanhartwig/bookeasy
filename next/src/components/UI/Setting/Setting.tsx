import { DetailedHTMLProps, HTMLAttributes } from 'react';
import styles from './setting.module.scss';

interface SettingProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string,
  children?: JSX.Element | never[],
  /**
   * If provided, will use switch instead of 'Edit' button
   */
  toggleState?: boolean,
  onAction?: (...args: any) => any,
}

export const Setting: React.FC<SettingProps> = ({label, children, toggleState, onAction}) => {

  return (
    <div className={styles.Setting}>
      <p className={styles.label}>{label}</p>
      <div className={styles.value}>
        {children}
      </div>
      <div className={styles.action} onClick={onAction}>
        {toggleState === undefined && <p>Edit</p>}
      </div>
    </div>
  )
} 