export const inRange = (range: [string | number, string | number], value: string | number, inclusive: boolean = true) => 
  inclusive 
    ? value >= range[0] && value <= range[1]
    : value > range[0] && value < range[1]
;