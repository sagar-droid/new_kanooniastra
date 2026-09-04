import { NextResponse, type NextRequest } from "next/server";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import { blogPostInputSchema } from "@/lib/validation/blogPost";
import { sanitizeRichText } from "@/lib/sanitize";

const PAGE_SIZE = 10;

export async function GET(request: NextRequest) {
  await connectToDatabase();

  const { searchParams } = request.nextUrl;
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const q = searchParams.get("q")?.trim();
  const status = searchParams.get("status");
  const category = searchParams.get("category");

  const filter: Record<string, unknown> = {};
  if (q) filter.title = { $regex: q, $options: "i" };
  if (status === "draft" || status === "published") filter.status = status;
  if (category) filter.category = category;

  const [items, total] = await Promise.all([
    BlogPostModel.find(filter)
      .sort({ updatedAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .populate("author", "name designation")
      .lean(),
    BlogPostModel.countDocuments(filter),
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
  const parsed = blogPostInputSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }

  const data = parsed.data;
  await connectToDatabase();

  try {
    const post = await BlogPostModel.create({
      ...data,
      body: sanitizeRichText(data.body),
      publishedAt: data.status === "published" ? new Date() : undefined,
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);
    revalidatePath("/sitemap.xml");
    return NextResponse.json({ item: post }, { status: 201 });
  } catch (error: unknown) {
    if (isDuplicateKeyError(error)) {
      return NextResponse.json({ error: "That slug is already in use" }, { status: 409 });
    }
    console.error("Failed to create blog post", error);
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}

function isDuplicateKeyError(error: unknown): boolean {
  return typeof error === "object" && error !== null && (error as { code?: number }).code === 11000;
}
