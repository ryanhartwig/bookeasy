const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
export const testEmail = (str: string) => !!emailRegex.test(str.toLowerCase());