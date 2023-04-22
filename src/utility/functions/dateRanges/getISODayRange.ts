import { getDayRange } from "./getDayRange";

export const getISODayRange = (d: Date | number | string = new Date()): [string, string] => {
  const date = new Date(d);

  const [start, end] = getDayRange();

  return [
    new Date(start).toISOString(),
    new Date(end).toISOString(),
  ]
}