import { z } from 'zod';

const UserSignUpSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Name is too short' })
        .max(50, { message: 'Name is too long' }),
    email: z.email(),
    password: z
        .string()
        .min(8, { message: 'Password is too short' })
        .max(25, { message: 'Password is too long' }),
});

export default UserSignUpSchema;
