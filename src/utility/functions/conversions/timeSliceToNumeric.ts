/**
 * Convert availability slices into a numeric equivalent
 * @param slice Time slice in military format eg 5:15, 16:45
 * @returns Numeric equivalent eg 525, 1675
 */
export const timeSliceToNumeric = (slice: string) => {
  let [hr, min] = slice.split(':').map(str => Number(str));
  min = min / 15 * 25;
  return Number(`${hr}${min.toString().padStart(2, '0')}`);
}