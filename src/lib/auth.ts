import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import db from "@/utility/db";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        if (!credentials.email || !credentials.password) return null;

        const federated = await db.query('select * from federated_credentials where email = $1', [credentials.email]);
        if (!federated.rows[0]) return null;

        const { registered_user_id, credential } = federated.rows[0];
        if (!await bcrypt.compare(credentials.password, credential)) return null;

        const user = await db.query('select * from registered_user where id = $1', [registered_user_id]);
        return user.rows[0];
      },
    }),
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          id: token.id,
          name: session?.user?.name,
          email: session?.user?.email,
          created: token.created,
          phone: token.phone,
          own_business_id: token.own_business_id,
          avatar: token.avatar,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id, 
          created: u.created,
          phone: u.phone,
          own_business_id: u.own_business_id,
          avatar: u.avatar,
        };
      }
      return token;
    },
  },
};
