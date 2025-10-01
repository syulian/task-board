import { z } from 'zod';

const LabelSchema = z.object({
    name: z
        .string()
        .min(1, { message: 'Label name is too short' })
        .max(20, { message: 'Label name is too long' }),
    color: z.string(),
});

export default LabelSchema;
