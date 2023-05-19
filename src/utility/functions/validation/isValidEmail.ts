const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const isValidEmail = (str: string) => !!emailRegex.test(str.toLowerCase());