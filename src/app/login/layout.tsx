import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from './login.module.scss';

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/home/dashboard');
  }
  
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        {children}
      </div>
    </div>
  )
}