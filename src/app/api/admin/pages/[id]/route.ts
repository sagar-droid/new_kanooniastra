import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import PageModel from "@/models/Page";
import { pageInputSchema } from "@/lib/validation/page";
import { sanitizeRichText } from "@/lib/sanitize";

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await connectToDatabase();
  const item = await PageModel.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = pageInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  await connectToDatabase();
  const existing = await PageModel.findById(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const previousSlug = existing.slug;

  try {
    existing.set({
      ...data,
      body: sanitizeRichText(data.body),
      publishedAt:
        data.status === "published" ? existing.publishedAt ?? new Date() : existing.publishedAt,
    });
    await existing.save();
    revalidatePath(`/${existing.slug}`);
    if (previousSlug !== existing.slug) revalidatePath(`/${previousSlug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ item: existing });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    console.error("Failed to update page", error);
    return NextResponse.json({ error: "Failed to update page" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await connectToDatabase();
  const deleted = await PageModel.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath(`/${deleted.slug}`);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true });
}
