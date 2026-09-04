import mongoose, { Schema, type Document } from "mongoose";
import type { ContentStatus } from "./shared";

export interface FAQ extends Document {
  question: string;
  answer: string;
  category?: string;
  displayOrder: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const FAQSchema = new Schema<FAQ>(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true },
    category: { type: String },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published" },
  },
  { timestamps: true }
);

FAQSchema.index({ status: 1, category: 1, displayOrder: 1 });

export default (mongoose.models.FAQ as mongoose.Model<FAQ>) ||
  mongoose.model<FAQ>("FAQ", FAQSchema);
