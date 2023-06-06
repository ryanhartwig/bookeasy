import { LoadingSplash } from "@/components/UI/LoadingSplash/LoadingSplash";
import styles from './book.module.scss';

export default function Loading() {

  return (
    <>
      <div className={styles.background}>
        <LoadingSplash loading />
      </div>  
    </>
  )
}