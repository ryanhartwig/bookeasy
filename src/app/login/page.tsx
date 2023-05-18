import { Input } from "@/components/UI/Input/Input";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import styles from './login.module.scss';
import { Login, Logout } from "./loginButtons";
import { SessionSample } from "./sessionSample";

export default async function page() {
  const session = await getServerSession(authOptions);

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
        <SessionSample />
        <br />
        <br />
        <p>from getServerSession:</p>
        {session && <p>{session.user?.email}</p>}
        {session && <p>{session.user?.name}</p>}
      </div>
    </div>
  )
}