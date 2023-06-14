import clsx from "clsx";
import styles from './header.module.scss';
import { Logout } from "./UI/Logout";
import { Spinner } from "./UI/Spinner/Spinner";
interface HeaderProps {
  text: string,
  loading?: boolean,
}

export const Header: React.FC<HeaderProps> = ({text, loading = false}) => {

  return (
    <div className={clsx(styles.header, {[styles.loading]: loading})}>
      <div className={styles.headerContent}>
        {loading && <div className={styles.loadingTrack}>
          <span />
        </div>}

        <div className={styles.title}>
          <h2>{text}</h2>
          {loading && <Spinner style={{marginLeft: 10}} size={12} />}
        </div>
        <Logout />
      </div>
    </div>
  )
}