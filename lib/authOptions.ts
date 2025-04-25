import CredentialsProvider from "next-auth/providers/credentials";
import connect from "@/db";
import User from "@/models/User";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth",
  },
  secret: "some_long_random_string",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          await connect();

          const user = await User.findOne({ email: credentials.email });

          if (
            user.email === credentials.email &&
            user.password === credentials.password
          ) {
            return {
              id: user._id,
              email: user.email,
              name: user.name,
              admin: user.admin,
            };
          }

          return null;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.admin = token.admin as boolean;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.admin = Boolean(user.admin);
      }
      return token;
    },
  },
};