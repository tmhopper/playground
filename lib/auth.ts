import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/db";

const APP_PASSWORD = process.env.APP_PASSWORD ?? "changeme";
const APP_USER_EMAIL = process.env.APP_USER_EMAIL ?? "you@example.com";

const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      name: "password",
      credentials: {
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const input = typeof credentials?.password === "string" ? credentials.password : "";
        const expectedHash = await bcrypt.hash(APP_PASSWORD, 10);
        const ok = await bcrypt.compare(input, expectedHash);
        if (!ok) return null;

        // Ensure single app user exists.
        const user = await prisma.user.upsert({
          where: { email: APP_USER_EMAIL },
          update: {},
          create: { email: APP_USER_EMAIL },
        });
        return { id: user.id, email: user.email };
      },
    }),
  ],
  session: { strategy: "jwt" },
  pages: { signIn: "/login" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.id) {
        (session.user as { id?: string }).id = token.id as string;
      }
      return session;
    },
  },
};

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig);

export async function requireUserId(): Promise<string> {
  const session = await auth();
  const id = (session?.user as { id?: string } | undefined)?.id;
  if (!id) throw new Error("Unauthorized");
  return id;
}

export async function getUserId(): Promise<string | null> {
  const session = await auth();
  return (session?.user as { id?: string } | undefined)?.id ?? null;
}
