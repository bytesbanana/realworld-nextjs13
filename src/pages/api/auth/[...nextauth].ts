import UserAPI from "lib/api/user";
import NextAuth from "next-auth";

import type { NextAuthOptions } from "next-auth";

import CredentialsProvider from "next-auth/providers/credentials";
import { User } from "lib/types/user";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      authorize: async function (credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };
        let user: User | null = null;
        try {
          const res = await UserAPI.login(email, password);
          user = res.user;
        } catch (error) {
          return null;
        }

        return {
          id: "",
          name: user.username,
          accessToken: user.token,
          image: user.image,
          bio: user.bio,
          email: user.email,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/login",
    newUser: "/auth/regsiter"
  },
  callbacks: {
    async jwt({ token, user }) {
      console.log(user);
      if (user) {
        token.accessToken = user.accessToken;
        token.picture = user.image;
        token.bio = user.bio;
      }
      return token;
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.bio = token.bio;
      return session;
    },
  },
};

export default NextAuth(authOptions);
