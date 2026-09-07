import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import { blogPostInputSchema } from "@/lib/validation/blogPost";
import { sanitizeRichText } from "@/lib/sanitize";

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await connectToDatabase();
  const post = await BlogPostModel.findById(params.id).lean();

  if (!post) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  return NextResponse.json({ item: post });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = blogPostInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  await connectToDatabase();

  const existing = await BlogPostModel.findById(params.id);
  if (!existing) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const previousSlug = existing.slug;

  try {
    existing.set({
      ...data,
      body: sanitizeRichText(data.body),
      publishedAt:
        data.status === "published" ? existing.publishedAt ?? new Date() : existing.publishedAt,
    });
    await existing.save();
    revalidatePath("/blog");
    revalidatePath(`/blog/${existing.slug}`);
    if (previousSlug !== existing.slug) revalidatePath(`/blog/${previousSlug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ item: existing });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    console.error("Failed to update blog post", error);
    return NextResponse.json({ error: "Failed to update blog post" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  await connectToDatabase();
  const deleted = await BlogPostModel.findByIdAndDelete(params.id);

  if (!deleted) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  revalidatePath("/blog");
  revalidatePath(`/blog/${deleted.slug}`);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true });
}
