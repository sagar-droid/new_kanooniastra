import mongoose, { Schema, type Document, type Types } from "mongoose";
import { ImageAssetSchema, type ImageAsset } from "./shared";

export type TestimonialStatus = "approved" | "pending";

export interface Testimonial extends Document {
  clientName: string;
  quote: string;
  rating?: number;
  relatedCaseStudy?: Types.ObjectId;
  photo?: ImageAsset;
  status: TestimonialStatus;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<Testimonial>(
  {
    clientName: { type: String, required: true, default: "Anonymous" },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5 },
    relatedCaseStudy: { type: Schema.Types.ObjectId, ref: "CaseStudy" },
    photo: { type: ImageAssetSchema },
    status: { type: String, enum: ["approved", "pending"], default: "pending" },
  },
  { timestamps: true }
);

TestimonialSchema.index({ status: 1, createdAt: -1 });

export default (mongoose.models.Testimonial as mongoose.Model<Testimonial>) ||
  mongoose.model<Testimonial>("Testimonial", TestimonialSchema);
