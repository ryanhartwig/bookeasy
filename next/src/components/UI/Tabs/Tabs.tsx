import React from 'react';
import styles from './tabs.module.scss';

interface TabsProps {
  tabs: String[],
  tab: number,
  setTab: React.Dispatch<React.SetStateAction<number>>,
}

export const Tabs: React.FC<TabsProps> = ({tabs, tab, setTab}) => {

  return (
    <div className={styles.nav}>
      <div onClick={() => setTab(0)} className='noselect'>
        <p>Booked</p>
        <div className={styles.tab_indicator} style={{left: `calc(100% * ${tab})`}} />
      </div>
      <div onClick={() => setTab(1)} className='noselect'>
        <p>Previous</p>
      </div>
    </div>
  )
}