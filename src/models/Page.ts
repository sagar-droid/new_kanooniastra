import mongoose, { Schema, type Document } from "mongoose";
import { SeoFieldsSchema, type SeoFields, type ContentStatus } from "./shared";

export interface Page extends Document {
  title: string;
  slug: string;
  body: string;
  status: ContentStatus;
  publishedAt?: Date;
  seo: SeoFields;
  createdAt: Date;
  updatedAt: Date;
}

const PageSchema = new Schema<Page>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    body: { type: String, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    seo: { type: SeoFieldsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

export default (mongoose.models.Page as mongoose.Model<Page>) ||
  mongoose.model<Page>("Page", PageSchema);
