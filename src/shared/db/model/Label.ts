import { model, models, Schema } from 'mongoose';

const labelSchema = new Schema({
    order: Number,
    name: String!,
    color: String!,
    board: { type: Schema.Types.ObjectId, ref: 'Board' }!,
});

const Label = models.Label || model('Label', labelSchema);
export default Label;
