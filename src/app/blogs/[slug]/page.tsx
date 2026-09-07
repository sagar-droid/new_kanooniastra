import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import BlogPostModel from "@/models/BlogPost";
import "@/models/TeamMember";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectToDatabase();
  const posts = await BlogPostModel.find({ status: "published" }).select("slug").lean();
  return posts.map((post) => ({ slug: post.slug }));
}

async function getPost(slug: string) {
  await connectToDatabase();
  return BlogPostModel.findOne({ slug, status: "published" })
    .populate("author", "name designation")
    .lean();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post) {
    return { title: "Article Not Found" };
  }

  const title = post.seo?.metaTitle || post.title;
  const description = post.seo?.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical: `/blogs/${post.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: (post.seo?.ogImage ?? post.coverImage).url }],
    },
  };
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const post = await getPost(params.slug);

  if (!post) {
    notFound();
  }

  const author = post.author as unknown as { name: string; designation: string } | null;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: `https://kanooniastra.com${post.coverImage.url}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { "@type": "Person", name: author?.name ?? "Kanooni Astra" },
    publisher: {
      "@type": "Organization",
      name: "Kanooni Astra",
      logo: { "@type": "ImageObject", url: "https://kanooniastra.com/logo.png" },
    },
    mainEntityOfPage: `https://kanooniastra.com/blogs/${post.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kanooniastra.com" },
      { "@type": "ListItem", position: 2, name: "Blog", item: "https://kanooniastra.com/blog" },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `https://kanooniastra.com/blogs/${post.slug}`,
      },
    ],
  };

  return (
    <article className="container py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <Link href="/blog" className="text-primary hover:underline">
        &larr; All Articles
      </Link>

      <div className="mx-auto mt-6 max-w-3xl">
        <span className="text-sm font-medium text-primary">{post.category}</span>
        <h1 className="mt-2 text-4xl font-semibold text-gray-900">{post.title}</h1>
        {author && (
          <p className="mt-2 text-gray-500">
            By {author.name}
            {author.designation ? `, ${author.designation}` : ""}
            {post.publishedAt && ` · ${new Date(post.publishedAt).toLocaleDateString()}`}
          </p>
        )}

        <div className="relative mt-8 h-80 w-full overflow-hidden rounded-lg">
          <Image src={post.coverImage.url} alt={post.coverImage.alt} fill className="object-cover" />
        </div>

        <div
          className="prose mt-8 max-w-none"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />

        {post.tags.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span key={tag} className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-600">
                {tag}
              </span>
            ))}
          </div>
        )}

        <Link
          href="/contactus"
          className="mt-10 inline-block rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
        >
          Discuss Your Legal Matter With Kanooni Astra
        </Link>
      </div>
    </article>
  );
};

export default BlogPostPage;
