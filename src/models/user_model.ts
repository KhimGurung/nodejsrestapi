import { Schema, model } from "mongoose";
import crypto from 'crypto';
import { IUser } from "../utils/types";

const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: [true, "Name is required."],
    },
    username: {
        type: String,
        required: [true, "Username is required."],
        unique: true,
        dropDups: true
    },
    contact: {
        type: String,
        required: false,
    },
    dob:{
        type: Date,
        required: false
    },
    nonce: {
        type: String,
        required: [true, "Nounce is required."],
        default: crypto.randomBytes(60).toString('hex')
    },
    refreshTokens: {
        type: Schema.Types.ObjectId,
        ref: "tokens"
    }
}, { timestamps: true });

const userModel = model<IUser>("users", userSchema);
export default userModel;