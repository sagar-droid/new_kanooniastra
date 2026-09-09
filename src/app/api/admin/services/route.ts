import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import { serviceInputSchema } from "@/lib/validation/service";

const PAGE_SIZE = 15;

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status");

  const filter: Record<string, unknown> = {};
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: "i" } },
      { slug: { $regex: q, $options: "i" } },
    ];
  }
  if (status === "draft" || status === "published") filter.status = status;

  const [items, total] = await Promise.all([
    ServiceModel.find(filter)
      .sort({ displayOrder: 1, createdAt: 1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .lean(),
    ServiceModel.countDocuments(filter),
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
  const parsed = serviceInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  await connectToDatabase();

  try {
    const item = await ServiceModel.create(parsed.data);
    revalidatePath("/");
    revalidatePath("/our-services");
    revalidatePath(`/our-services/${item.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ item }, { status: 201 });
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    console.error("Failed to create service", error);
    return NextResponse.json({ error: "Failed to create service" }, { status: 500 });
  }
}

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}
