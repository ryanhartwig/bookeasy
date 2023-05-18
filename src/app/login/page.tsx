import { Input } from "@/components/UI/Input/Input";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from './login.module.scss';
import { Login, Logout } from "./loginButtons";

export default async function page() {
  const session = await getServerSession(authOptions) as any;
  if (session) {
    redirect('/home/dashboard');
  }
  
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <p>Sample login</p>
        <br />
        <Input placeholder="Name" />
        <br />
        <Input placeholder="Email" />
        <br />
        <Login />
        <br />
        <Logout />
        <br />
        {/* <SessionSample /> */}
        <br />
        <br />
        <p>from getServerSession:</p>
      </div>
    </div>
  )
}