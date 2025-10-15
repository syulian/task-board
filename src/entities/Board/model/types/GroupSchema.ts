import { z } from 'zod';

const GroupSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Group name is too short' })
        .max(40, { message: 'Group name is too long' }),
});

export default GroupSchema;
