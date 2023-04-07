import { getDayRange } from "./getDayRange";

export const getMonthRange = (d: Date | number = new Date()): [number, number] => {
  const initDate = new Date(d);
  initDate.setDate(1);
  initDate.setDate((initDate.getDay() * -1) + 1);

  const [start] = getDayRange(initDate);
  initDate.setDate(initDate.getDate() + 41);
  const [_, end] = getDayRange(initDate);

  return [start, end];
}