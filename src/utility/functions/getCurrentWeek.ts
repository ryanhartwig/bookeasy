export const getCurrentWeek = (): [Date, Date] => {
  const weekStart = new Date();
  const day = weekStart.getDay();

  if (day === 0) { //sunday
    weekStart.setDate(weekStart.getDate() - 6); // sun = 6
  } else {
    weekStart.setDate(weekStart.getDate() - (day - 1)); // mon-sat = 0-5
  }
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