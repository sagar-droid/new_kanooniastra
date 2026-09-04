import { Schema } from "mongoose";

export interface ImageAsset {
  url: string;
  alt: string;
}

export const ImageAssetSchema = new Schema<ImageAsset>(
  {
    url: { type: String, required: true },
    alt: { type: String, required: true },
  },
  { _id: false }
);

export interface SeoFields {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: ImageAsset;
}

export const SeoFieldsSchema = new Schema<SeoFields>(
  {
    metaTitle: { type: String },
    metaDescription: { type: String },
    ogImage: { type: ImageAssetSchema },
  },
  { _id: false }
);

export type ContentStatus = "draft" | "published";
