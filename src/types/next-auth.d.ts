import type { User } from "./../lib/types/user";
import type { Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

/** Example on how to extend the built-in session types */
declare module "next-auth" {
  interface Session {
    accessToken: string;
  }
  interface User extends User {
    accessToken: string;
  }
}

/** Example on how to extend the built-in types for JWT */
declare module "next-auth/jwt" {
  interface JWT {
    /** This is an example. You can find me in types/next-auth.d.ts */
    accessToken: string;
  }
}
