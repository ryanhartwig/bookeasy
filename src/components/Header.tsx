import clsx from "clsx";
import styles from './header.module.scss';
import { Logout } from "./UI/Logout";
interface HeaderProps {
  text: string,
  loading?: boolean,
}

export const Header: React.FC<HeaderProps> = ({text, loading = false}) => {

  return (
    <div className={clsx(styles.header, {[styles.loading]: loading})}>
      {loading && <div className={styles.loadingTrack}>
        <span />
      </div>}
      <h2>{text}</h2>
      <Logout />
    </div>
  )
}