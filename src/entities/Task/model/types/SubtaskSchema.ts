import { z } from 'zod';

export const SubtaskSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Subtask name is too short' })
        .max(30, { message: 'Subtask name is too long' }),
});
