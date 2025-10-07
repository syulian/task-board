import { z } from 'zod';

export const TaskSchema = z.object({
    title: z
        .string()
        .min(4, { message: 'Task name is too short' })
        .max(30, { message: 'Task name is too long' }),
    dueDate: z.date().nullable(),
    body: z.string().max(800, { message: 'Task description is too long' }).optional(),
    subtasks: z
        .object({
            order: z.number(),
            value: z.string(),
            checked: z.boolean(),
        })
        .array()
        .optional(),
    labels: z.string().array().optional(),
    list: z
        .object({
            id: z.string(),
            label: z.string(),
        })
        .required(),
});
