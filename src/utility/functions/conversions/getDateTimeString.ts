export const getDateTimeString = (d: number | string | Date) => {
  const date = new Date(d);

  const [time, period] = date.toLocaleTimeString().split(' ');
  const [hr, min] = time.split(":");

  return `${date.toDateString().slice(0, -5)} at ${hr}:${min} ${period}`;
}

type Days = 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat' | 'Sun'
const days = {
  Mon: 'Monday',
  Tue: 'Tuesday',
  Wed: 'Wednesday',
  Thu: 'Thursday',
  Fri: 'Friday',
  Sat: 'Saturday',
  Sun: 'Sunday'
}
export const getDateTimeStringFull = (d: number | string | Date) => {
  const initDate = new Date(d);

  const [day, month, date, year] = initDate.toDateString().split(' ');
  const [time, period] = initDate.toLocaleTimeString().split(' ');
  const [hr, min] = time.split(":");

  return [
    `${days[day as Days]}, ${month} ${date}, ${year}`,
    `at ${hr}:${min} ${period}`,
  ]
}