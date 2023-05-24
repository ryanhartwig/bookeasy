import { Spinner } from '../Spinner/Spinner';
import styles from './loading.module.scss';

interface LoadingViewProps {
  text: string,
}

export const LoadingView: React.FC<LoadingViewProps> = ({text}) => {

  return (
    <div className={styles.loading}>
      <div className={styles.loadingBox}>
        <Spinner size={25} />
        <div className={styles.loadingText}>
          <p>Loading {text}</p>
          <div className={styles.dots}>
            <span></span>
            <span></span>
            <span></span>  
          </div>
        </div>
      </div>
    </div>
  )
}