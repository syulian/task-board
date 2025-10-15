import { z } from 'zod';

const EditBoardSchema = z.object({
    name: z
        .string()
        .min(4, { message: 'Board name is too short' })
        .max(40, { message: 'Board name is too long' }),
    group: z.object({
        id: z.string(),
        label: z.string(),
    }),
});

export default EditBoardSchema;
