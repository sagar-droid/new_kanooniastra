import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import FAQModel from "@/models/FAQ";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Frequently Asked Questions",
  description:
    "Answers to common questions about Kanooni Astra's legal services in Nepal, including corporate law, FDI, intellectual property, and litigation.",
  alternates: { canonical: "/faq" },
};

const FAQPage = async () => {
  await connectToDatabase();
  const faqs = await FAQModel.find({ status: "published" }).sort({ displayOrder: 1 }).lean();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kanooniastra.com" },
      { "@type": "ListItem", position: 2, name: "FAQ", item: "https://kanooniastra.com/faq" },
    ],
  };

  return (
    <div className="container py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <h1 className="mb-12 text-5xl text-primary">Frequently Asked Questions</h1>

      <div className="mx-auto flex max-w-3xl flex-col gap-6">
        {faqs.map((faq) => (
          <div key={String(faq._id)} className="rounded-lg bg-white p-6 shadow-md">
            <h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
            <p className="mt-2 text-gray-700">{faq.answer}</p>
          </div>
        ))}
        {faqs.length === 0 && <p className="text-gray-600">No FAQs published yet.</p>}
      </div>
    </div>
  );
};

export default FAQPage;
