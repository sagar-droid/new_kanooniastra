import Image from "next/image";
import type { Metadata } from "next";
import { connectToDatabase } from "@/lib/mongodb";
import TestimonialModel from "@/models/Testimonial";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Client Testimonials",
  description:
    "What clients say about working with Kanooni Astra, a law firm based in Bagbazar, Kathmandu, Nepal.",
  alternates: { canonical: "/testimonials" },
};

const TestimonialsPage = async () => {
  await connectToDatabase();
  const testimonials = await TestimonialModel.find({ status: "approved" })
    .sort({ createdAt: -1 })
    .lean();

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://kanooniastra.com" },
      {
        "@type": "ListItem",
        position: 2,
        name: "Testimonials",
        item: "https://kanooniastra.com/testimonials",
      },
    ],
  };

  return (
    <div className="container py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <h1 className="mb-12 text-5xl text-primary">Client Testimonials</h1>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {testimonials.map((testimonial) => (
          <div key={String(testimonial._id)} className="rounded-lg bg-white p-6 shadow-md">
            <div className="flex items-center gap-4">
              {testimonial.photo && (
                <div className="relative h-12 w-12 overflow-hidden rounded-full">
                  <Image
                    src={testimonial.photo.url}
                    alt={testimonial.photo.alt}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div>
                <p className="font-semibold text-gray-900">{testimonial.clientName}</p>
                {testimonial.rating && (
                  <p className="text-sm text-yellow-500">
                    {"★".repeat(testimonial.rating)}
                    {"☆".repeat(5 - testimonial.rating)}
                  </p>
                )}
              </div>
            </div>
            <p className="mt-4 italic text-gray-700">&ldquo;{testimonial.quote}&rdquo;</p>
          </div>
        ))}
        {testimonials.length === 0 && (
          <p className="text-gray-600">No testimonials published yet.</p>
        )}
      </div>
    </div>
  );
};

export default TestimonialsPage;
