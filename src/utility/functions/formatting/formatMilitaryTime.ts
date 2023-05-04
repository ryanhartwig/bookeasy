/**
 * Convert military / standard time into standard 12hr time with am/pm
 * 
 * @param t time in hr:min format (eg 14:15)
 */
export const formatMilitaryTime = (t: string) => {
  let [hr, min] = t.split(':').map(str => Number(str));
  let period = 'am';

  if (hr >= 12) period = 'pm';
  if (hr > 12) hr -= 12;
  if (hr === 0) hr = 12;

  return `${hr}:${min}${!min ? '0' : ''} ${period}`;
}