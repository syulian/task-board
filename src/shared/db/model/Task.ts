import { model, models, Schema } from 'mongoose';

const taskSchema = new Schema({
    order: Number,
    title: String!,
    complete: Boolean,
    dueDate: Date,
    body: String,
    subtasks: [
        {
            order: Number,
            value: String!,
            checked: Boolean,
        },
    ],
    labels: [{ type: Schema.Types.ObjectId, ref: 'Label' }],
    list: { type: Schema.Types.ObjectId, ref: 'List' }!,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }!,
});

const Task = models.Task || model('Task', taskSchema);
export default Task;
