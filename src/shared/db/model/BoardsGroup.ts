import { model, models, Schema } from 'mongoose';

const boardsGroupSchema = new Schema({
    order: Number,
    name: String!,
});

const BoardsGroup = models.BoardsGroup || model('BoardsGroup', boardsGroupSchema);
export default BoardsGroup;
