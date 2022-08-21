import { Schema, model } from "mongoose";
import { IToken } from "../utils/types";

const tokenSchema = new Schema<IToken>({
    refreshToken: {
        type: String,
        required: [true, "Refresh token is required."],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }
}, { timestamps: true });

const tokenModel = model<IToken>("tokens", tokenSchema);
export default tokenModel;