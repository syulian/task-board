import { model, models, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: String,
        email: { type: String, unique: true, required: true, lowercase: true, trim: true },
        password: String,
    },
    { timestamps: true },
);

const User = models.User || model('User', userSchema);
export default User;
