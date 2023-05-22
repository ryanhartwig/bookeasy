import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import styles from './login.module.scss';

import Radial from '@/assets/login_background_svg.svg';
import Image from "next/image";

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect('/home/dashboard');
  }
  
  return (
    <div className={styles.login}>
      <div className={styles.loginBox}>
        {/* Left side */}
        <div className={styles.visual}>
          <Image className={styles.colorbackground} src={Radial} alt="Login background" />
        </div>

        {/* Right side (form) */}
        <div className={styles.forms}>
          {children}
        </div>
      </div>
    </div>
  )
}