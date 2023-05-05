export const getISOYearRange = (d: Date | number | string) => {
  const end = new Date();

  const start = new Date(end);
  start.setMonth(0);
  start.setDate(1);
  start.setHours(0, 0, 0, 0);

  end.setMonth(12); // intentional
  end.setDate(0);
  end.setHours(23, 59, 59, 999);

  return [start.toISOString(), end.toISOString()];
}