export function generateRandomUUID(length: number = 8): string {
  const alphanumericChars: string = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let uuid: string = '';

  for (let i = 0; i < length; i++) {
    const randomIndex: number = Math.floor(Math.random() * alphanumericChars.length);
    uuid += alphanumericChars[randomIndex];
  }

  return uuid;
}