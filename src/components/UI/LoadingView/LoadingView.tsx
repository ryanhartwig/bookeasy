import { Spinner } from '../Spinner/Spinner';
import styles from './loading.module.scss';

export const LoadingView = () => {

  return (
    <div className={styles.loading}>
      <div className={styles.loadingBox}>
        <p>Loading Services</p>
        <Spinner size={25} />
      </div>
    </div>
  )
}