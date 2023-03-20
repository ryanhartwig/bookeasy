import { Teams } from './teams';
import styles from './teams.module.scss';

export default function Page() {
  return (
    <div className={styles.Teams}>
      <div className={styles.teams_section}>
        <p>My teams</p>
        <Teams />
      </div>
    </div>
  )
}