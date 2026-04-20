import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/db"

const client = await clientPromise;
const db = client.db("better-auth-db"); 

export const auth = betterAuth({
    experimental: { joins: true },
 database: mongodbAdapter(db),
    emailAndPassword:{
      enabled:true,
    },
    emailVerification:{

    }
});