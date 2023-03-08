/** Parse a date into the start and end of the day of a given date
 * 
 * @param d Date or number (Date.getTime()) to parse
 * @returns The Date.getTime() (milliseconds) representing the very start and end of the day, of the provided date
 */
export const getDayRange = (d: Date | number): [number, number] => {
  const date = new Date(d);

  // Set to very start of provided day
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);

  const start = date.getTime();

  // Set to very end of provided day
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setMilliseconds(999);

  const end = date.getTime();

  return [start, end];
}