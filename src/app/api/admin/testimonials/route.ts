import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";
import { testimonialInputSchema } from "@/lib/validation/testimonial";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = searchParams.get("status");

  const filter: Record<string, unknown> = {};
  if (status === "approved" || status === "pending") filter.status = status;

  const [items, total] = await Promise.all([
    TestimonialModel.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .populate("relatedCaseStudy", "title")
      .lean(),
    TestimonialModel.countDocuments(filter),
  ]);

  return NextResponse.json({
    items,
    total,
    page,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  });
}

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const parsed = testimonialInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();

  const { relatedCaseStudy, ...rest } = parsed.data;
  const item = await TestimonialModel.create({
    ...rest,
    relatedCaseStudy: relatedCaseStudy || undefined,
  });

  revalidatePath("/testimonials");
  return NextResponse.json({ item }, { status: 201 });
}
