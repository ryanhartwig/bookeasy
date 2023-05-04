export const formatPeriodToMilitary = (hr: number, min: number, period: 'am' | 'pm') => {
  let hours = hr;
  if (period === 'pm' && hours < 12) hours += 12;
  if (period === 'am' && hours === 12) hours = 0;
  return `${hours}:${min === 0 ? '00' : min}`;
}