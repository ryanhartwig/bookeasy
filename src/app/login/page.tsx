import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { LocalLogin } from "./locallogin";
import styles from './login.module.scss';

export default async function page() {
  const session = await getServerSession(authOptions) as any;
  if (session) {
    redirect('/home/dashboard');
  }
  
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <p>Sample login</p>
        <LocalLogin />
      </div>
    </div>
  )
}