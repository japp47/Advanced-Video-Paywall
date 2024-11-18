import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { NextAuthConfig } from "next-auth";
import GitHub from "next-auth/providers/github";
import { db } from "./db/db";

export default {
    adapter: DrizzleAdapter(db),
    providers: [GitHub],
    session: {
        strategy: "jwt",
    }
} satisfies NextAuthConfig;