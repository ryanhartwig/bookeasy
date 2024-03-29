import styles from './login.module.scss';

import Radial from '@/assets/login_background_svg.svg';
import Image from "next/image";

// Left demo images
import CL from '@/assets/login/CL.png';
import CR from '@/assets/login/CR.png';
import CT from '@/assets/login/CT.png';
import CB from '@/assets/login/CB.png';
import TL from '@/assets/login/TL.png';
import TR from '@/assets/login/TR.png';
import BL from '@/assets/login/BL.png';
import BR from '@/assets/login/BR.png';
import L from '@/assets/login/L.png';
import R from '@/assets/login/R.png';

import * as bookit from '@/assets/logo_temp.svg';

import clsx from "clsx";
import { LoadingSplash } from "@/components/UI/LoadingSplash/LoadingSplash";
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';

export default async function Layout({children}: {children: React.ReactNode}) {
  const session = await getServerSession(authOptions);
  
  return (
    <div className={styles.login}>
      {session 
      ? <>
        <LoadingSplash loading />
        {children}
      </>
      : <>
        <LoadingSplash className={styles.loadingSplash} />
        <div className={styles.loginBox}>
          {/* Left side */}
          <div className={clsx(styles.visual, 'noselect')}>
            <Image className={styles.colorbackground} src={Radial} alt="Login background" />
            <div className={styles.imagecolumn}>
              <div>
                <Image style={{position: 'absolute', width: '110%', right: 0}} src={L} alt="Background preview" />
              </div>
            </div>
            <div className={styles.imagecolumn}>
              <div>
                <Image src={TL} alt="Background preview" />
                <Image src={TR} alt="Background preview" />
              </div>
              <div>
                <Image style={{opacity: 0.8}} src={CT} alt="Background preview" />
              </div>
              <div>
                <Image style={{opacity: 0.8}} src={CL} alt="Background preview" />
                <Image style={{opacity: 0.8}} src={CR} alt="Background preview" />
                <div className={styles.title}>
                  <p>Appointment scheduling</p>
                  <p>made easy.</p> 
                </div>
              </div>
              <div>
                <Image style={{opacity: 0.8}} src={CB} alt="Background preview" />
              </div>
              <div>
                <Image src={BL} alt="Background preview" />
                <Image src={BR} alt="Background preview" />
              </div>
            </div>
            <div className={styles.imagecolumn}>
              <div>
                <Image src={R} style={{position: 'absolute', width: '190%', rotate: '180deg', left: 0}} alt="Background preview" />
              </div>
            </div>

            <div className={styles.logo}>
              <Image className='Navigator_logo_icon' priority src={bookit.default} alt="Book it logo" />
              <p><span>book</span>easy.</p>
            </div>
          </div>

          {/* Right side (form) */}
          <div className={styles.forms}>
            {children}
            <span className={styles.shadow} />
          </div>
        </div>
      </>}
    </div>
  )
}