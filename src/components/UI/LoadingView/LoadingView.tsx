import styles from './loading.module.scss';

export const LoadingView = () => {


  return (
    <div className={styles.loading}>
      <div className={styles.loadingBox}>
        <p>Loading</p>
      </div>
    </div>
  )
}