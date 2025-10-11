import { model, models, Schema } from 'mongoose';

const listSchema = new Schema({
    order: Number,
    name: String,
    color: String,
    board: { type: Schema.Types.ObjectId, ref: 'Board' }!,
});

const List = models.List || model('List', listSchema);
export default List;
