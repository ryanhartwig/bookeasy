import './Day.css';

import clsx from 'clsx';

import { IoIosFlash } from 'react-icons/io';
import { minMaxDate } from '../../utility/helpers/minMaxDate';
import { useAppSelector } from '../../utility/helpers/hooks';

interface DayProps {
  date: Date,
  viewing: {
    month: number,
    year: number,
  }
  onSelect?: ([min, max]: [number, number]) => any,
  selected?: [number, number],
}

export const Day = ({date, viewing, onSelect, selected}: DayProps) => {

  const today = new Date();
  const ss = [0, 6].includes(date.getDay());

  const data = useAppSelector(s => s.workoutData.routineData);

  const [rangeMin, rangeMax] = minMaxDate(date);
  const session = data.some(d => rangeMin <= d.start_date && rangeMax >= d.start_date);

  return (
    <div className={clsx('Day', {ss})} 
      onClick={() => onSelect && onSelect([rangeMin, rangeMax])}
      style={{cursor: onSelect && 'pointer'}}
    >
      <div className={clsx(
        'Day-content', 
        {'out-of-view': viewing.month !== date.getMonth()},
        {'today': viewing.month === today.getMonth() && date.getDate() === today.getDate()},
        {ss},
        {session},
        {'selected': selected?.includes(rangeMin)}
      )}>
        {session && <IoIosFlash size={'85%'} className='Day-content-flash' />}
        <p>{date.getDate()}</p>

      </div>
    </div>
  )
}