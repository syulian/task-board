import { z } from 'zod';

const BoardSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Board name is too short' })
        .max(40, { message: 'Board name is too long' }),
});

export default BoardSchema;
