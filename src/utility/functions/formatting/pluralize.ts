export const pluralize = (str: string, data: number) => {
  return `${str}${data !== 1 ? 's' : ''}`;
}