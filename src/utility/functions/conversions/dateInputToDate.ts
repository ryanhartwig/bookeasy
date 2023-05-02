export const dateInputToDate = (input: string) => {
  const date = new Date();
  let [year, month, day] = input.split('-').map(str => Number(str));
  month--; // 0 indexed

  date.setFullYear(year);
  date.setMonth(month)
  date.setDate(day);
  date.setHours(0,0,0,0);

  return date;
}