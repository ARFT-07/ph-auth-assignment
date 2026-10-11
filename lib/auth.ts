import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// Reuse one client across dev hot reloads / serverless invocations
const g = globalThis as unknown as { _mongo?: MongoClient };
const client =
  g._mongo ?? new MongoClient(process.env.MONGODB_URI ?? "mongodb://127.0.0.1:27017/bazardor");
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

export const auth = betterAuth({
  database: mongodbAdapter(db),
  baseURL: process.env.BETTER_AUTH_URL,
  emailAndPassword: {
    enabled: true,
    autoSignIn: false, // after sign-up the user is sent to the sign-in page
    minPasswordLength: 8,
  },
  socialProviders: social,
  plugins: [nextCookies()],
});
