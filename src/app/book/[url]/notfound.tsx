import styles from './book.module.scss';

export const NotFound = () => (
  <div className={styles.background}>
    <div className={styles.notfound}>
      <div className={styles.errorcode}>
        <hr />
        <p className={styles.fourohfour}>404</p>
        <hr />
      </div>
      <p>The booking page URL may have changed or no longer exists.</p>
    </div>
  </div>
)