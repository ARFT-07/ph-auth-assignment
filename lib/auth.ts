import dns from "node:dns";
import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Local dev only: some routers/ISPs/VPNs refuse the SRV DNS lookup that
// mongodb+srv:// needs (querySrv ECONNREFUSED). Use public DNS for it.
if (process.env.NODE_ENV !== "production") {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
}

if (!process.env.MONGODB_URI) {
  console.error("[auth] MONGODB_URI is not set - sign up / sign in will fail.");
}

// Reuse one client across dev hot reloads / serverless invocations
const g = globalThis as unknown as { _mongo?: MongoClient };
const client =
  g._mongo ??
  new MongoClient(process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/bazardor");
if (process.env.NODE_ENV !== "production") g._mongo = client;
const db = client.db(); // database name comes from the URI path

const social: Record<string, { clientId: string; clientSecret: string }> = {};
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  social.google = {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  };
}
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  social.github = {
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  };
}

// Vercel serves the same app on several URLs (production alias, git-branch URL,
// per-deployment URL). Better Auth rejects requests from unknown origins
// ("Invalid origin"), so every URL this deployment can be opened from is trusted.
const prodHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const baseURL =
  process.env.BETTER_AUTH_URL ?? (prodHost ? `https://${prodHost}` : undefined);
const trustedOrigins = [
  baseURL,
  prodHost && `https://${prodHost}`,
  process.env.VERCEL_URL && `https://${process.env.VERCEL_URL}`,
  process.env.VERCEL_BRANCH_URL && `https://${process.env.VERCEL_BRANCH_URL}`,
  "http://localhost:3000",
].filter((o): o is string => Boolean(o));

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL,
  trustedOrigins,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // after sign-up the user is sent to the sign-in page
    minPasswordLength: 8,
  },
  socialProviders: social,
  // Same email via email/password and Google/GitHub = one account
  // (prevents the "account_not_linked" error).
   account: {
    accountLinking: {
      enabled: true,
      trustedProviders: ["google", "github"],
      // Email sign-up has no email verification in this app, so the existing
      // local account is "unverified". Without this the link is refused.
      requireLocalEmailVerified: false,
    },
  },
  plugins: [nextCookies()],
});