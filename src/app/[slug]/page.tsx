import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import PageModel from "@/models/Page";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectToDatabase();
  const pages = await PageModel.find({ status: "published" }).select("slug").lean();
  return pages.map((page) => ({ slug: page.slug }));
}

async function getPage(slug: string) {
  await connectToDatabase();
  return PageModel.findOne({ slug, status: "published" }).lean();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const page = await getPage(params.slug);

  if (!page) {
    return { title: "Page Not Found" };
  }

  return {
    title: page.seo?.metaTitle || page.title,
    description: page.seo?.metaDescription,
    alternates: { canonical: `/${page.slug}` },
  };
}

const GenericPage = async ({ params }: { params: { slug: string } }) => {
  const page = await getPage(params.slug);

  if (!page) {
    notFound();
  }

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kanooniastra.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: page.title,
        item: `https://kanooniastra.com/${page.slug}`,
      },
    ],
  };

  return (
    <div className="container py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="mb-8 text-4xl font-semibold text-gray-900">{page.title}</h1>
        <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: page.body }} />
      </div>
    </div>
  );
};

export default GenericPage;
