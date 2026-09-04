import mongoose, { Schema, type Document } from "mongoose";

export type UserRole = "admin" | "editor";

export interface User extends Document {
  email: string;
  passwordHash: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<User>(
  {
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["admin", "editor"], default: "admin" },
  },
  { timestamps: true }
);

export default (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
