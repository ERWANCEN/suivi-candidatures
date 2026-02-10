import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        nom: {
            type: String,
            required: true,
        },
        mail: {
            type: String,
            required: true
        },
        mdp: {
            type: String,
            required: true
        }
    }, { timestamps: true }
);

export default mongoose.models.User || mongoose.model("User", UserSchema);