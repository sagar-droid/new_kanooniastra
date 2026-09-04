import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudyModel from "@/models/CaseStudy";
import { caseStudyInputSchema } from "@/lib/validation/caseStudy";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status");
  const practiceArea = searchParams.get("practiceArea");

  const filter: Record<string, unknown> = {};
  if (q) filter.title = { $regex: q, $options: "i" };
  if (status === "draft" || status === "published") filter.status = status;
  if (practiceArea) filter.practiceArea = practiceArea;

  const [items, total] = await Promise.all([
    CaseStudyModel.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    CaseStudyModel.countDocuments(filter),
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
  const parsed = caseStudyInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const item = await CaseStudyModel.create({
      ...parsed.data,
      publishedAt: parsed.data.status === "published" ? new Date() : undefined,
    });
    revalidatePath("/case-studies");
    revalidatePath(`/case-studies/${item.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    console.error("Failed to create case study", error);
    return NextResponse.json({ error: "Failed to create case study" }, { status: 500 });
  }
}

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}
