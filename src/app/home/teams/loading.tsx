import { Header } from "@/components/Header";
import styles from './teams.module.scss';
import Image from "next/image";
import addTeam from '@/assets/team_add.svg';
import { LoadingDots } from "@/components/UI/LoadingDots/LoadingDots";

export default function Loading() {
  return (
    <>
      <Header text="Teams" loading />
      <div className={styles.Teams}>
        <div className={styles.teams_section}>
          <p>My teams</p>
          <div className={styles.user_teams}>
            {/* Create team */}
            <div className={styles.create_team} style={{pointerEvents: 'none'}}> 
              <LoadingDots size={3} style={{padding: 8}} />
              <Image src={addTeam} alt='Add team icon' className={styles.create_team_icon} />
            </div>
          </div>
        </div>
        
      </div>
    </>
  )
}