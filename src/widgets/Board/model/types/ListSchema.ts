import { z } from 'zod';

const ListSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Task name is too short' })
        .max(30, { message: 'Task name is too long' }),
});

export default ListSchema;
