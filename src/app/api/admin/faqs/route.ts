import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import FAQModel from "@/models/FAQ";
import { faqInputSchema } from "@/lib/validation/faq";

const PAGE_SIZE = 20;

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  const filter: Record<string, unknown> = {};
  if (status === "draft" || status === "published") filter.status = status;
  if (category) filter.category = category;

  const [items, total] = await Promise.all([
    FAQModel.find(filter)
      .sort({ displayOrder: 1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    FAQModel.countDocuments(filter),
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
  const parsed = faqInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();
  const item = await FAQModel.create(parsed.data);
  revalidatePath("/faq");
  return NextResponse.json({ item }, { status: 201 });
}
