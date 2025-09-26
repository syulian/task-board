import { model, models, Schema } from 'mongoose';

const boardSchema = new Schema({
    order: Number,
    name: String,
    groupId: { type: Schema.Types.ObjectId, ref: 'BoardsGroup' }!,
});

const Board = models.Board || model('Board', boardSchema);
export default Board;
