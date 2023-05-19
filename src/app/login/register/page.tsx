import { Input } from "@/components/UI/Input/Input";
import styles from '../login.module.scss';

export default function Page() {


  return (
    <div className={styles.form}>
      <p>Create a new account</p>
      <Input />
      <Input />
      <Input />
    </div>
  )
} 