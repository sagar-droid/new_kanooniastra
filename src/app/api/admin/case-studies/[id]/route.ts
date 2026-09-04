import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudyModel from "@/models/CaseStudy";
import { caseStudyInputSchema } from "@/lib/validation/caseStudy";

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await connectToDatabase();
  const item = await CaseStudyModel.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = caseStudyInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const existing = await CaseStudyModel.findById(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  const previousSlug = existing.slug;

  try {
    existing.set({
      ...parsed.data,
      publishedAt:
        parsed.data.status === "published" ? existing.publishedAt ?? new Date() : existing.publishedAt,
    });
    await existing.save();
    revalidatePath("/case-studies");
    revalidatePath(`/case-studies/${existing.slug}`);
    if (previousSlug !== existing.slug) revalidatePath(`/case-studies/${previousSlug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ item: existing });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    console.error("Failed to update case study", error);
    return NextResponse.json({ error: "Failed to update case study" }, { status: 500 });
  }
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await connectToDatabase();
  const deleted = await CaseStudyModel.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/case-studies");
  revalidatePath(`/case-studies/${deleted.slug}`);
  revalidatePath("/sitemap.xml");
  return NextResponse.json({ success: true });
}
