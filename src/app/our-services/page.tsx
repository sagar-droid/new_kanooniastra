import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { services as fallbackServices } from "../../../data/services";
import { connectToDatabase } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";

export const revalidate = 3600;

export const metadata: Metadata = {
  title: "Our Legal Services in Kathmandu, Nepal",
  description:
    "Kanooni Astra offers legal services across corporate law, foreign direct investment, intellectual property, litigation, family law, criminal law, and more in Nepal.",
  alternates: { canonical: "/our-services" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Our Services",
      item: "https://kanooniastra.com/our-services",
    },
  ],
};

async function getPublishedServices() {
  try {
    await connectToDatabase();
    const dbServices = await ServiceModel.find({ status: "published" })
      .sort({ displayOrder: 1, createdAt: 1 })
      .lean();

    if (dbServices && dbServices.length > 0) {
      return dbServices.map((s) => ({
        id: s.slug,
        title: s.title,
        intro: s.intro,
        images: s.image?.url || "/fdi.jpeg",
      }));
    }
  } catch (error) {
    console.error("Failed to query ServiceModel, falling back to static services", error);
  }

  return fallbackServices.map((s) => ({
    id: s.id,
    title: s.title,
    intro: s.intro,
    images: s.images,
  }));
}

const OurServicesPage = async () => {
  const services = await getPublishedServices();
  return (
    <div className=" min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-2">
          Our Legal Services in Nepal
        </h1>
        <p className="text-center text-gray-600 mb-12">
          Kanooni Astra&apos;s practice areas, based in Kathmandu
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link
              key={service.id}
              href={`/our-services/${service.id}`}
              className="bg-white shadow-md rounded-lg p-6 flex flex-col gap-4 hover:shadow-lg transition-shadow duration-300"
            >
              <Image
                src={service.images}
                alt={`${service.title} services at Kanooni Astra`}
                width={400}
                height={400}
                className="w-full h-40 object-contain"
              />
              <h2 className="text-2xl font-semibold text-blue-600">
                {service.title}
              </h2>
              <p className="text-gray-700">{service.intro}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServicesPage;
