import {z} from 'zod';

export const schema = z.object({
    email: z.string({
        message: "Invalid email"
    }).email(),
    password: z.string({
        message: "Incorrect username or password"
    }).min(8).max(255),
});
