import {z} from 'zod';

export const SignupSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
    name: z.string(),
})

export const SigninSchema = z.object({
    username: z.string().min(5),
    password: z.string().min(8),
    name: z.string(),
})