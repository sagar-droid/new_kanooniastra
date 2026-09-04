import mongoose, { Schema, type Document } from "mongoose";
import { ImageAssetSchema, type ImageAsset, type ContentStatus } from "./shared";

export interface SocialLinks {
  facebook?: string;
  linkedin?: string;
  instagram?: string;
  twitter?: string;
}

export interface TeamMember extends Document {
  name: string;
  slug: string;
  designation: string;
  photo: ImageAsset;
  bio: string;
  qualifications: string[];
  practiceAreas: string[];
  officeLocation?: string;
  email?: string;
  phone?: string;
  socialLinks: SocialLinks;
  displayOrder: number;
  status: ContentStatus;
  createdAt: Date;
  updatedAt: Date;
}

const SocialLinksSchema = new Schema<SocialLinks>(
  {
    facebook: { type: String },
    linkedin: { type: String },
    instagram: { type: String },
    twitter: { type: String },
  },
  { _id: false }
);

const TeamMemberSchema = new Schema<TeamMember>(
  {
    name: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    designation: { type: String, required: true },
    photo: { type: ImageAssetSchema, required: true },
    bio: { type: String, required: true },
    qualifications: { type: [String], default: [] },
    practiceAreas: { type: [String], default: [] },
    officeLocation: { type: String },
    email: { type: String },
    phone: { type: String },
    socialLinks: { type: SocialLinksSchema, default: () => ({}) },
    displayOrder: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "published" },
  },
  { timestamps: true }
);

TeamMemberSchema.index({ status: 1, displayOrder: 1 });

export default (mongoose.models.TeamMember as mongoose.Model<TeamMember>) ||
  mongoose.model<TeamMember>("TeamMember", TeamMemberSchema);
