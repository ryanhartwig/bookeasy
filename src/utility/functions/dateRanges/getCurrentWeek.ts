export const getCurrentWeek = (): [Date, Date] => {
  const weekStart = new Date();
  const day = (weekStart.getDay() + 6) % 7;
  weekStart.setDate(weekStart.getDate() - day)

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  weekStart.setHours(0);
  weekStart.setMinutes(0);
  weekStart.setSeconds(0);
  weekStart.setMilliseconds(0);

  weekEnd.setHours(23);
  weekEnd.setMinutes(59);
  weekEnd.setSeconds(59);
  weekEnd.setMilliseconds(999);

  return [weekStart, weekEnd];
}