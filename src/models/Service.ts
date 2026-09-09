import mongoose, { Schema, type Document } from "mongoose";
import { ImageAssetSchema, type ImageAsset, type ContentStatus } from "./shared";

export interface Service extends Document {
  title: string;
  slug: string;
  intro: string;
  description: string[];
  image: ImageAsset;
  displayOrder: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<Service>(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    intro: { type: String, required: true, trim: true },
    description: { type: [String], default: [] },
    image: { type: ImageAssetSchema, required: true },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published" },
  },
  { timestamps: true }
);

ServiceSchema.index({ status: 1, displayOrder: 1 });

export default (mongoose.models.Service as mongoose.Model<Service>) ||
  mongoose.model<Service>("Service", ServiceSchema);
