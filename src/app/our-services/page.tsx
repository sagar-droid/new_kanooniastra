import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { services } from "../../../data/services";

export const metadata: Metadata = {
  title: "Our Services",
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

const OurServicesPage = () => {
  return (
    <div className=" min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">
          Our Services
        </h1>
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
