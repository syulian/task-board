import { model, models, Schema } from 'mongoose';

const boardsGroupSchema = new Schema({
    order: Number!,
    name: String!,
    userId: { type: Schema.Types.ObjectId, ref: 'User' }!,
});

const BoardsGroup = models.BoardsGroup || model('BoardsGroup', boardsGroupSchema);
export default BoardsGroup;
