import { model, models, Schema } from 'mongoose';

const boardSchema = new Schema({
    order: Number,
    name: String,
    group: { type: Schema.Types.ObjectId, ref: 'Board' },
});

const Board = models.Board || model('Board', boardSchema);
export default Board;
