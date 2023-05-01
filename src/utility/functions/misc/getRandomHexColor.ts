import { rgbToHex } from "../conversions/rgbToHex";

export const getRandomHexColor = (profile: [number, number] = [15, 219]) => {
  if (profile.some(n => n < 0 || n > 255)) return;

  const randomFiller = Math.floor(Math.random() * (Math.max(...profile) - Math.min(...profile))) + Math.min(...profile);

  const values = [randomFiller, ...profile];
  const random: number[] = [];

  while (values.length) {
    const randomIndex = Math.floor(Math.random() * 3);
    random.push(...values.splice(randomIndex, 1));
  }

  return rgbToHex(random[0], random[1], random[2]);
}