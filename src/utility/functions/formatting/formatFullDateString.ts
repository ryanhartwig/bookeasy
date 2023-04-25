import { formatTime } from "./formatTime";

export const formatFullDateString = (d: Date | number | string) => {
  const dateObject = new Date(d);
  
  const [day, month, date, year] = dateObject.toString().split(' ');
  const time = formatTime(dateObject);

  return `${day}, ${month} ${date}, ${year} at ${time}`;
}