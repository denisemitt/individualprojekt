import {z} from "zod";

export const serverSchema = z.object({
    DATABASE_URL: z.string().url(),
    NODE_ENV: z.enum(["development", "test", "production"]),
})

export const clientSchema = z.object({
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  });


  
 export const clientEnv = {
   // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
 };  