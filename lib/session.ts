import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import jsonwebtoken from "jsonwebtoken";
import { JWT } from "next-auth/jwt";
import { signIn } from "next-auth/react";
import { SessionInterface, UserProfile } from "@/common.types";
import { getUser } from "./actions";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  //jwt: {
  // encode: ({ secret, token }) => {},
  //decode: async ({ secret, token }) => {},
  //},
  theme: {
    colorScheme: "light",
    logo: "/logo.png",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
  },
  async signIn({ user }: { user: AdapterUser | User }) {
    try {
      const userExists = (await getUser(user?.email as string)) as {
        user?: UserProfile;
      };

      if (!userExists.user) {
        await createUser(
          user.name as string,
          user.email as string,
          user.image as string
        );
      }

      return true;
    } catch (error: any) {
      console.log("Error checking if user exists: ", error.message);
      return false;
    }
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
function createUser(arg0: string, arg1: string, arg2: string) {
  throw new Error("Function not implemented.");
}
