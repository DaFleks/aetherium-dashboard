import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

import bcryptjs from "bcryptjs";

import prisma from "@/lib/prisma";
import { signInSchema } from "./lib/zod";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          id: "email",
          name: "email",
        },
        password: {
          type: "password",
          label: "Password",
          id: "password",
          name: "password",
        },
      },
      authorize: async (credentials) => {
        let user = null;
        // Validate input
        const { email, password } = signInSchema.parse(credentials);

        // Grab the user based on the email
        user = await prisma.user.findUnique({ where: { email } });

        if (user) {
          if (!(await bcryptjs.compare(password, user.hashedPassword))) user = null;
        }

        return user;
      },
    }),
  ],
});
