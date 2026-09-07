import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Legal Insights & Blog",
  description:
    "Legal insights, updates, and guides from Kanooni Astra covering Nepali corporate law, foreign direct investment, intellectual property, and more.",
  alternates: { canonical: "/blog" },
};

const BlogIndexPage = async () => {
  await connectToDatabase();
  const posts = await BlogPostModel.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .populate("author", "name")
    .lean();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kanooniastra.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://kanooniastra.com/blog" },
    ],
  };

  return (
    <div className="container py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <h1 className="mb-12 text-5xl text-primary">Legal Insights</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Link
            key={String(post._id)}
            href={`/blog/${post.slug}`}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image
                src={post.coverImage.url}
                alt={post.coverImage.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <span className="text-sm font-medium text-primary">{post.category}</span>
              <h2 className="text-xl font-semibold text-gray-900">{post.title}</h2>
              <p className="line-clamp-3 text-gray-600">{post.excerpt}</p>
              {post.publishedAt && (
                <span className="mt-auto pt-2 text-sm text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </Link>
        ))}
        {posts.length === 0 && (
          <p className="text-gray-600">No articles published yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
};

export default BlogIndexPage;
