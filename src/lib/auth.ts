import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import FacebookProvider from "next-auth/providers/facebook";
import db from "@/utility/db";
import bcrypt from 'bcrypt';
import uuid from "react-uuid";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID!,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET!,
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

        const federated = await db.query("select * from federated_credentials where email = $1 and provider = 'credentials'", [credentials.email]);
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
    async signIn({ user, account }) {
      // Login in or register if signing in with OAuth
      if (account?.provider && user) {
        const { name, email, image: avatar } = user;
        const { providerAccountId: provider_id } = account;

        // find existing credentials for the email
        const credentials = await db.query('select * from federated_credentials where email = $1', [email]);

        // No user exists with the email
        if (!credentials.rowCount) {
          await db.query('begin');

          try {
            const id = uuid();

            await db.query(`
              insert into registered_user (id, name, email, created, avatar) 
              values ($1, $2, $3, $4, $5)
            `, [id, name, email, new Date().toISOString(), avatar]);
            await db.query('insert into user_prefs(registered_user_id) values ($1)', [id]);
            await db.query(`
              insert into federated_credentials (provider, registered_user_id, email, provider_id)
              values ($1, $2, $3, $4)
            `, [account.provider, id, email, provider_id]);

            // Create user's business (for "My Business" tab)
            const businessId = uuid();
            await db.query(`
              insert into business (id, name, created, creator_id) 
              values ($1, $2, $3, $4)
              returning id
            `, [businessId, name, new Date().toISOString(), id]);
            // Update link in reg. user
            await db.query('update registered_user set business_id = $1 where id = $2', [businessId, id]);

            await db.query('commit');
            return true; // Allow user sign in
          } catch(e) {
            await db.query('rollback');
            return false;
          }
        } else {
          // User exists with current strategy, log in
          if (credentials.rows.find((c: any) => c.provider === account.provider)) {
            return true;
          }
          
          // User exists with email, but hasn't logged in with the current strategy before
          const registered_user_id = credentials.rows[0].registered_user_id;
          await db.query(`
            insert into federated_credentials (provider, registered_user_id, email, provider_id)
            values ($1, $2, $3, $4)
          `, [account.provider, registered_user_id, email, provider_id]);
          return true;
        }
      }
      return true;
    },
    session: async ({ session, token }) => {
      const response = await db.query('select registered_user_id from federated_credentials where email = $1 limit 1', [token.email]);
      return {
        ...session,
        user: {
          id: response.rows[0].registered_user_id,
          email: token.email,
        },
      };
    },
    jwt: ({ token, user }) => {
      if (user) {
        const u = user as unknown as any;
        return {
          ...token,
          id: u.id, 
        };
      }
      return token;
    },

  },
  pages: {
    error: '/login',
  }
};
