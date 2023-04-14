import { formatTime } from "./formatTime";

export const formatFullDateString = (d: Date) => {
  const [day, month, date, year] = d.toString().split(' ').map(el => Number(el));
  const time = formatTime(d);

  return `${day}, ${month} ${date}, ${year} at ${time}`;
}