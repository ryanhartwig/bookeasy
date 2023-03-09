import styles from './calendar.module.scss';


import { SecondaryHeader } from "@/components/SecondaryHeader"

export default function Page() {
  
  return (
    <div className={styles.calendar}>
      <SecondaryHeader>

      </SecondaryHeader>
      <div className={styles.content}>

      </div>
    </div>
  )
}