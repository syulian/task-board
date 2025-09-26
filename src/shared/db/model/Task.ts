import { model, models, Schema } from 'mongoose';
import subtaskSchema from '@shared/db/model/Subtask';

const taskSchema = new Schema({
    order: Number,
    title: String!,
    complete: Boolean,
    dueDate: Date,
    body: String,
    subtasks: [subtaskSchema],
    listId: { type: Schema.Types.ObjectId, ref: 'List' }!,
});

const Task = models.Task || model('Task', taskSchema);
export default Task;
