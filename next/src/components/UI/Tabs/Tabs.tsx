import clsx from 'clsx';
import React from 'react';
import styles from './tabs.module.scss';

interface TabsProps extends React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  tabs: string[],
  tab: number,
  setTab: React.Dispatch<React.SetStateAction<number>>,
}

export const Tabs: React.FC<TabsProps> = ({tabs, tab, setTab, ...props}) => {

  return (
    <div {...props} className={clsx(styles.nav, props.className ?? '')}>
      {tabs.map((t, i) => (
        <div key={t} onClick={() => setTab(i)} className='noselect'>
          <p>{t}</p>
          {!i && <div className={styles.tab_indicator} style={{left: `calc(100% * ${tab})`}} />}
        </div>
      ))}
    </div>
  )
}