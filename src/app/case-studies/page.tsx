import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import CaseStudyModel from "@/models/CaseStudy";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Case Studies",
  description:
    "Case studies from Kanooni Astra's legal practice in Nepal, covering corporate law, intellectual property, litigation, and more.",
  alternates: { canonical: "/case-studies" },
};

const CaseStudiesIndexPage = async () => {
  await connectToDatabase();
  const caseStudies = await CaseStudyModel.find({ status: "published" })
    .sort({ publishedAt: -1 })
    .lean();

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
    ],
  };

  return (
    <div className="container py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <h1 className="mb-12 text-5xl text-primary">Case Studies</h1>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
        {caseStudies.map((caseStudy) => (
          <Link
            key={String(caseStudy._id)}
            href={`/case-studies/${caseStudy.slug}`}
            className="flex flex-col overflow-hidden rounded-lg bg-white shadow-md transition-shadow hover:shadow-lg"
          >
            <div className="relative h-48 w-full">
              <Image
                src={caseStudy.coverImage.url}
                alt={caseStudy.coverImage.alt}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-2 p-5">
              <span className="text-sm font-medium text-primary">{caseStudy.practiceArea}</span>
              <h2 className="text-xl font-semibold text-gray-900">{caseStudy.title}</h2>
              <p className="line-clamp-3 text-gray-600">{caseStudy.summary}</p>
            </div>
          </Link>
        ))}
        {caseStudies.length === 0 && (
          <p className="text-gray-600">No case studies published yet. Check back soon.</p>
        )}
      </div>
    </div>
  );
};

export default CaseStudiesIndexPage;
