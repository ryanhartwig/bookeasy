import { Input } from "@/components/UI/Input/Input";
import styles from '../login.module.scss';

export default function Page() {


  return (
    <div className={styles.form}>
      <p>Create a new account</p>
      <Input className={styles.input} placeholder="Your name" />
      <Input className={styles.input} placeholder="Your email" />
      <Input className={styles.input} placeholder="Your password" />
      <Input className={styles.input} placeholder="Confirm password" />
    </div>
  )
} 