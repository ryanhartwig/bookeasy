import { Input } from "@/components/UI/Input/Input";
import styles from './login.module.scss';

export default function page() {

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <p>Sample login</p>
        <br />
        <Input placeholder="Name" />
        <br />
        <Input placeholder="Email" />
        <br />
      </div>
    </div>
  )
}