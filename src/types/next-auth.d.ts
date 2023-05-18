import NextAuth from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: {
      avatar: string | null,
      created: string,
      id: string,
      own_business_id: string,
      phone: string,
      id: string,
      name: string,
      email: string,
    }
  }
}