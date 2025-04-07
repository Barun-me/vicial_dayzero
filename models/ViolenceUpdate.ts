// models/ViolenceUpdate.ts
import mongoose, { Schema, Document, Types } from "mongoose";

export interface IViolenceUpdate extends Document {
    user?: Types.ObjectId; // Reference to the user who created the post
    desc: string;
    imageUrl?: string;
    location?: {
        lat: number;
        lng: number;
        address?: string;
    };
    date?: Date;
    createdAt: Date;
}

export interface User extends Document {
    name: string;
    email: string;
    img?: string;
    password?: string;
    // Reference to the ViolenceUpdate model
    violenceUpdates?: IViolenceUpdate[];
    createdAt: Date;
    updatedAt: Date;
}

const ViolenceUpdateSchema: Schema<IViolenceUpdate> = new Schema({
    // Reference to the user who created the post.
    user: { type: Schema.Types.ObjectId, ref: "User"},
    desc: { type: String, required: true },
    imageUrl: { type: String, required: true },
    location: {
        lat: { type: Number, required: true },
        lng: { type: Number, required: true },
        address: { type: String },
    },
    date: { type: Date, required: true },
    // TTL index: document expires after 86400 seconds (1 day)
    createdAt: { type: Date, default: Date.now, expires: 86400 }, // TTL index: document expires after 86400 seconds (1 day)
});

const UserSchema: Schema<User> = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    img: { type: String },
    // Reference to the ViolenceUpdate model
    violenceUpdates: [
        {
            type: Schema.Types.ObjectId,
            ref: "ViolenceUpdate"
        }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

// Use existing model if already registered
export const ViolenceUpdate = mongoose.models.ViolenceUpdate || mongoose.model<IViolenceUpdate>("ViolenceUpdate", ViolenceUpdateSchema);
export const User = mongoose.models.User || mongoose.model<User>("User", UserSchema);
