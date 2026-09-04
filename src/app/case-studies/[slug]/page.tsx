import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudyModel from "@/models/CaseStudy";

export const revalidate = 3600;

export async function generateStaticParams() {
  await connectToDatabase();
  const caseStudies = await CaseStudyModel.find({ status: "published" }).select("slug").lean();
  return caseStudies.map((caseStudy) => ({ slug: caseStudy.slug }));
}

async function getCaseStudy(slug: string) {
  await connectToDatabase();
  return CaseStudyModel.findOne({ slug, status: "published" }).lean();
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    return { title: "Case Study Not Found" };
  }

  const title = caseStudy.seo?.metaTitle || caseStudy.title;
  const description = caseStudy.seo?.metaDescription || caseStudy.summary;

  return {
    title,
    description,
    alternates: { canonical: `/case-studies/${caseStudy.slug}` },
    openGraph: {
      title,
      description,
      type: "article",
      images: [{ url: caseStudy.coverImage.url }],
    },
  };
}

const CaseStudyPage = async ({ params }: { params: { slug: string } }) => {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: caseStudy.title,
    description: caseStudy.summary,
    image: `https://kanooniastra.com${caseStudy.coverImage.url}`,
    datePublished: caseStudy.publishedAt,
    dateModified: caseStudy.updatedAt,
    about: caseStudy.practiceArea,
    publisher: {
      "@type": "Organization",
      name: "Kanooni Astra",
      logo: { "@type": "ImageObject", url: "https://kanooniastra.com/logo.png" },
    },
    mainEntityOfPage: `https://kanooniastra.com/case-studies/${caseStudy.slug}`,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kanooniastra.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Case Studies",
        item: "https://kanooniastra.com/case-studies",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: caseStudy.title,
        item: `https://kanooniastra.com/case-studies/${caseStudy.slug}`,
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

      <Link href="/case-studies" className="text-primary hover:underline">
        &larr; All Case Studies
      </Link>

      <div className="mx-auto mt-6 max-w-3xl">
        <span className="text-sm font-medium text-primary">{caseStudy.practiceArea}</span>
        <h1 className="mt-2 text-4xl font-semibold text-gray-900">{caseStudy.title}</h1>
        <p className="mt-2 text-gray-500">
          Client: {caseStudy.clientName || "Anonymous"}
        </p>

        <div className="relative mt-8 h-80 w-full overflow-hidden rounded-lg">
          <Image
            src={caseStudy.coverImage.url}
            alt={caseStudy.coverImage.alt}
            fill
            className="object-cover"
          />
        </div>

        <div className="prose mt-8 max-w-none" dangerouslySetInnerHTML={{ __html: caseStudy.body }} />

        <div className="mt-8 rounded-lg bg-gray-50 p-6">
          <h2 className="text-xl font-semibold text-gray-900">Outcome</h2>
          <p className="mt-2 text-gray-700">{caseStudy.outcome}</p>
        </div>

        <Link
          href="/contactus"
          className="mt-10 inline-block rounded-lg bg-primary px-6 py-3 text-white transition-colors hover:bg-primary/90"
        >
          Discuss a Similar Matter With Kanooni Astra
        </Link>
      </div>
    </article>
  );
};

export default CaseStudyPage;
