export const getDateTimeString = (d: number | string | Date) => {
  const date = new Date(d);

  const [time, period] = date.toLocaleTimeString().split(' ');
  const [hr, min] = time.split(":");

  return `${date.toDateString().slice(0, -5)} at ${hr}:${min} ${period}`;
}