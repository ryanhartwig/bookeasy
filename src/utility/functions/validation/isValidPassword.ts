export const isValidPassword = (str: string) => {
  if (str.length < 6) return false;

  let hasUpper = false;
  let hasNumber = false;
  let hasSpecial = false;

  for (let i = 0; i < str.length; i++) {
    const char = str[i];

    if (!isNaN(Number(char))) hasNumber = true;
    else {
      if (char === char.toUpperCase()) hasUpper = true;
      if (char.toUpperCase() === char.toLowerCase()) hasSpecial = true;
    }
  }

  return hasUpper && hasNumber && hasSpecial;
}