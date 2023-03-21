import styles from './sectionlabel.module.scss';

import { DetailedHTMLProps, HTMLAttributes } from "react";
import clsx from 'clsx';

interface SectionLabelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string,
}

export const SectionLabel: React.FC<SectionLabelProps> = ({label, ...props}) => {

  return (
    <div {...props} className={clsx(styles.section_label, props.className || '')}>
      <p>{label}</p>
      <hr />
    </div>
  )
}