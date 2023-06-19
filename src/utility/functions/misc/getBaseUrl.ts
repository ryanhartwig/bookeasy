export const getBaseUrl = () => !!process.env.VERCEL
  ? "https://bookeasy.vercel.app"
  : "http://localhost:3000";