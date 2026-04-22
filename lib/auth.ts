import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "@/lib/db"
import { admin } from "better-auth/plugins";

const client = await clientPromise;
const db = client.db("better-auth-db"); 

export const auth = betterAuth({
    experimental: { joins: true },
 database: mongodbAdapter(db),
    emailAndPassword:{
      enabled:true,
    },
    emailVerification:{
      enabled:true,
      sendVerificationEmail: async ({ user, token }) => {
        // Implement your email sending logic here using your preferred email service
        console.log(`Send verification email to ${user.email} with token: ${token}`);
      },
    },

     plugins: [
        admin({defaultRole: "Recruiter"})
    ],
    admin: {
        enabled: true
    }
});