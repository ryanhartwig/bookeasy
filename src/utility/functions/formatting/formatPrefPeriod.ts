import { pluralize } from "./pluralize";

const month = 1000 * 60 * 60 * 24 * 30;
const week = 1000 * 60 * 60 * 24 * 6;
const day = 1000 * 60 * 60 * 24;
const hour = 1000 * 60 * 60;

export const formatPrefPeriod = (ms: number) => {
  let total = ms;
  let months = 0, weeks = 0, days = 0, hours = 0;
  let result = '';

  while (total >= month) months++ && (total -= month);
  while (total >= week) weeks++ && (total -= week);
  while (total >= day) days++ && (total -= day);
  while (total >= hour) hours++ && (total -= hour);

  if (months) result += `${months} ${pluralize('month', months)}, `;
  if (weeks) result += `${weeks} ${pluralize('month', weeks)}, `;
  if (days) result += `${days} ${pluralize('month', days)}, `;
  if (hours) result += `${hours} ${pluralize('month', hours)}, `;

  return result.slice(0, -2);
}