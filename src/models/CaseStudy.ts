import mongoose, { Schema, type Document } from "mongoose";
import { ImageAssetSchema, SeoFieldsSchema, type ImageAsset, type SeoFields, type ContentStatus } from "./shared";

export interface CaseStudy extends Document {
  title: string;
  slug: string;
  summary: string;
  body: string;
  clientName?: string;
  outcome: string;
  practiceArea: string;
  coverImage: ImageAsset;
  status: ContentStatus;
  publishedAt?: Date;
  seo: SeoFields;
  createdAt: Date;
  updatedAt: Date;
}

const CaseStudySchema = new Schema<CaseStudy>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    summary: { type: String, required: true },
    body: { type: String, required: true },
    clientName: { type: String },
    outcome: { type: String, required: true },
    practiceArea: { type: String, required: true },
    coverImage: { type: ImageAssetSchema, required: true },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    seo: { type: SeoFieldsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

CaseStudySchema.index({ status: 1, publishedAt: -1 });

export default (mongoose.models.CaseStudy as mongoose.Model<CaseStudy>) ||
  mongoose.model<CaseStudy>("CaseStudy", CaseStudySchema);
