import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import mongoose from "mongoose";
import { connectToDatabase } from "@/lib/mongodb";
import FAQModel from "@/models/FAQ";
import { faqInputSchema } from "@/lib/validation/faq";

export async function GET(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await connectToDatabase();
  const item = await FAQModel.findById(params.id).lean();
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json({ item });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  const parsed = faqInputSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const existing = await FAQModel.findById(params.id);
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  existing.set(parsed.data);
  await existing.save();

  revalidatePath("/faq");
  return NextResponse.json({ item: existing });
}

export async function DELETE(_request: NextRequest, { params }: { params: { id: string } }) {
  if (!mongoose.isValidObjectId(params.id)) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }
  await connectToDatabase();
  const deleted = await FAQModel.findByIdAndDelete(params.id);
  if (!deleted) return NextResponse.json({ error: "Not found" }, { status: 404 });
  revalidatePath("/faq");
  return NextResponse.json({ success: true });
}
