import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import db from "@/utility/db";
import bcrypt from 'bcrypt';

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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

        return {
          id: registered_user_id,
          email: credentials.email,
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials}) {
      if (account?.provider === 'google' && user) {
        const { id: provider_id, name, email, image: avatar } = user;
      }

      /**
       * you'll need to handle user creation after receiving the request
       */
      
      // console.log('user ', user)
      // console.log('account ', account)

      /** google oauth fields
       * account:
       *  provider
       * user:
       *  id
        * name
        * email
        * image
       */
      return true;
    },
    session: async ({ session, token }) => {
      const response = await db.query('select registered_user_id from federated_credentials where email = $1 limit 1', [token.email]);
      console.log(response.rows[0], '******');
      console.log('received session: ', session);
      console.log('received token: ', token);
      return {
        ...session,
        user: {
          id: response.rows[0].registered_user_id,
          email: token.email,
          newField: 'hello',
        },
      };
    },
    jwt: ({ token, user }) => {
      console.log('jwt received token: ', token);
      console.log('jwt received user: ', user);
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id, 
          newField: 'string',
        };
      }
      return token;
    },

  },
  pages: {
    error: '/login',
  }
};
