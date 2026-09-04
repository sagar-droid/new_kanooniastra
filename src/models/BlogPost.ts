import mongoose, { Schema, type Document, type Types } from "mongoose";
import { ImageAssetSchema, SeoFieldsSchema, type ImageAsset, type SeoFields, type ContentStatus } from "./shared";

export interface BlogPost extends Document {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  coverImage: ImageAsset;
  author: Types.ObjectId;
  category: string;
  tags: string[];
  status: ContentStatus;
  publishedAt?: Date;
  seo: SeoFields;
  createdAt: Date;
  updatedAt: Date;
}

const BlogPostSchema = new Schema<BlogPost>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    excerpt: { type: String, required: true },
    body: { type: String, required: true },
    coverImage: { type: ImageAssetSchema, required: true },
    author: { type: Schema.Types.ObjectId, ref: "TeamMember", required: true },
    category: { type: String, required: true },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    publishedAt: { type: Date },
    seo: { type: SeoFieldsSchema, default: () => ({}) },
  },
  { timestamps: true }
);

BlogPostSchema.index({ status: 1, publishedAt: -1 });

export default (mongoose.models.BlogPost as mongoose.Model<BlogPost>) ||
  mongoose.model<BlogPost>("BlogPost", BlogPostSchema);
