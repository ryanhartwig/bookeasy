import styles from './sectionlabel.module.scss';

import { DetailedHTMLProps, HTMLAttributes } from "react";

interface SectionLabelProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  label: string,
}

export const SectionLabel: React.FC<SectionLabelProps> = ({label, ...props}) => {

  return (
    <div {...props} className={styles.section_label}>
      <p>{label}</p>
      <hr />
    </div>
  )
}