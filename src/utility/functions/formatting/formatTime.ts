/**
 * 
 * @param date Date object or ms number (getTime()) 
 * @returns Time in HOUR:MIN AM/PM format eg: 8:00 AM
 */
export const formatTime = (date: number | string | Date, lowercase: boolean = false) => {
  const d = new Date(date);

  let [hours, period] = d.toLocaleTimeString().split(/\s/);

  hours = hours.split(':').slice(0, 2).join(':');

  if (lowercase) {
    period = period.toLowerCase();
  }

  return `${hours} ${period}`;
}