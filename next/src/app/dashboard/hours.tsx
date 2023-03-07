import styles from './dashboard.module.scss';

/* 

Formula to convert hours / mins into index:

  (Date.getHours() * 4) + (Date.getMinutes() / 15)

*/

export const Hours = () => {
  const blocks = new Array(96).fill(true);
  
  return (
    <div className={styles.hours}>
      {blocks.map((_, i) => {

        return (
          <div key={i} className={styles.block}>

          </div>
        )
      })}
    </div>
  )
}