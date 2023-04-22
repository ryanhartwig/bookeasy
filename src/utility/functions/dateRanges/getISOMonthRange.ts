import { getMonthRange } from "./getMonthRange";

export const getISOMonthRange = (d: Date | number | string = new Date()): [string, string] => {
  const date = new Date(d);

  const [start, end] = getMonthRange(date);
  return [
    new Date(start).toISOString(),
    new Date(end).toISOString(),
  ];
}