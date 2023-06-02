/**
 * Reverts numeric back into availability slice
 * @param num Numeric eg 525, 1675
 * @returns Time slice in military format eg 5:15, 16:45
 */ 
export const numericToTimeSlice = (num: number) => {
  const str = num.toString();
  const pivot = Math.floor(str.length / 2);
  return [str.slice(0, pivot), (Math.floor(Number(str.slice(pivot)) / 25) * 15).toString().padStart(2, '0')].join(':');
}