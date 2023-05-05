import { pluralize } from "./pluralize";

export const month = 1000 * 60 * 60 * 24 * 30;
export const week = 1000 * 60 * 60 * 24 * 6;
export const day = 1000 * 60 * 60 * 24;
export const hour = 1000 * 60 * 60;

export const formatPrefPeriod = (ms: number) => {
  let total = ms;
  let months = 0, weeks = 0, days = 0, hours = 0;
  let result = '';

  while (total >= month) {
    total -= month;
    months++;
  };
  while (total >= week) {
    total -= week;
    weeks++; 
  }
  while (total >= day) {
    total -= day;
    days++; 
  }
  while (total >= hour) {
    total -= hour;
    hours++; 
  }

  if (months) result += `${months} ${pluralize('month', months)}, `;
  if (weeks) result += `${weeks} ${pluralize('week', weeks)}, `;
  if (days) result += `${days} ${pluralize('day', days)}, `;
  if (hours) result += `${hours} ${pluralize('hour', hours)}, `;

  return { 
    text: result.slice(0, -2),
    months,
    weeks,
    days,
    hours
  };
}