/**
 * Convert military / standard time into standard 12hr time with am/pm
 * 
 * @param t time in hr:min format (eg 14:15)
 */
export const formatMilitaryTime = (t: string) => {
  let [hr, min] = t.split(':');
  let period = 'am';

  if (Number(hr) > 12) {
    hr = (Number(hr) - 12).toString();
    period = 'pm';
  }

  return `${hr}:${min} ${period}`;
}