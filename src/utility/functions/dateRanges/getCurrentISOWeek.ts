import { getCurrentWeek } from "./getCurrentWeek"

export const getCurrentISOWeek = (): [string, string] => {
  const range = getCurrentWeek();

  return [
    range[0].toISOString(),
    range[1].toISOString(),
  ]
}