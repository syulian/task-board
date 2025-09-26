import { Schema } from 'mongoose';

const subtaskSchema = new Schema({
    order: Number,
    value: String!,
    checked: Boolean,
});

export default subtaskSchema;
