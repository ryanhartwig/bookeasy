/** Parse a date into the start and end of the day of a given date
 * 
 * @param d Date or number (Date.getTime()) to parse
 * @returns The Date.getTime() (milliseconds) representing the very start and end of the day, of the provided date
 */
export const getDayRange = (d: Date | number = new Date()): [number, number] => {
  const date = new Date(d);

  // Set to very start of provided day
  date.setHours(0, 0, 0, 0)
  const start = date.getTime();

  // Set to very end of provided day
  date.setHours(23, 59, 59, 999);
  const end = date.getTime();

  return [start, end];
}