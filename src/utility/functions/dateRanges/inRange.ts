export const inRange = (range: [string | number, string | number], value: string | number) => 
  value >= range[0] && value <= range[1]
;