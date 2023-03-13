import { Clients } from './clients';
import { Details } from './details';
import styles from './page.module.scss';

export default function Page() {
  return (
    <div className={styles.wrapper}>
      <Clients />
      <Details />
    </div>
  )
}