export const dateToDateInput = (d: Date | number | string = new Date()) => {
  const date = new Date(d);

  const year = date.getFullYear();
  let month = (date.getMonth() + 1).toString();
  let day = date.getDate().toString();

  [month, day] = [month, day].map(val => val.length === 1 ? `0${val}` : val);

  return `${year}-${month}-${day}`;
}