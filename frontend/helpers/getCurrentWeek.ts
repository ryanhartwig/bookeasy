export const getCurrentWeek = (): [string, string] => {
  const weekStart = new Date();
  const day = weekStart.getDay();

  if (day === 0) { //sunday
    weekStart.setDate(weekStart.getDate() - 6); // sun = 6
  } else {
    weekStart.setDate(weekStart.getDate() - (day - 1)); // mon-sat = 0-5
  }
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekStart.getDate() + 6);

  const period: [string, string] = [
    `${weekStart.toDateString().split(' ').slice(1, 3).join(' ')}`,
    `${weekEnd.toDateString().split(' ').slice(1, 3).join(' ')}`
  ];

  return period;
}