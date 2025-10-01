import { z } from 'zod';

const UserSignInSchema = z.object({
    email: z.email(),
    password: z
        .string()
        .min(8, { message: 'Password is too short' })
        .max(25, { message: 'Password is too long' }),
});

export default UserSignInSchema;
