import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services } from "../../../../data/services";

export async function generateStaticParams() {
  return services.map((service) => ({ slug: service.id }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const service = services.find((s) => s.id === params.slug);

  if (!service) {
    return { title: "Service Not Found" };
  }

  return {
    title: `${service.title} Services in Nepal`,
    description: service.intro,
    alternates: { canonical: `/our-services/${service.id}` },
    openGraph: {
      title: `${service.title} Services in Nepal`,
      description: service.intro,
      images: [{ url: service.images }],
    },
  };
}

const ServicePage = ({ params }: { params: { slug: string } }) => {
  const service = services.find((s) => s.id === params.slug);

  if (!service) {
    notFound();
  }

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    description: service.intro,
    provider: {
      "@type": "LegalService",
      name: "Kanooni Astra",
      url: "https://kanooniastra.com",
    },
    areaServed: {
      "@type": "Country",
      name: "Nepal",
    },
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
      {
        "@type": "ListItem",
        position: 2,
        name: service.title,
        item: `https://kanooniastra.com/our-services/${service.id}`,
      },
    ],
  };

  return (
    <div className="min-h-screen py-12">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <div className="container mx-auto px-4">
        <Link href="/our-services" className="text-blue-600 hover:underline">
          &larr; All Services
        </Link>
        <div className="bg-white shadow-md rounded-lg p-8 mt-6 flex flex-col md:flex-row gap-10">
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary mb-4">
              {service.title}
            </h1>
            <p className="text-lg text-gray-700 mb-6">{service.intro}</p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              {service.description.map((desc, index) => (
                <li key={index}>{desc}</li>
              ))}
            </ul>
            <Link
              href="/contactus"
              className="inline-block mt-8 rounded-lg bg-primary px-6 py-3 text-white hover:bg-primary/90 transition-colors"
            >
              Contact Us About This Service
            </Link>
          </div>
          <div className="flex-shrink-0">
            <Image
              src={service.images}
              alt={`${service.title} services at Kanooni Astra`}
              width={400}
              height={400}
              className="rounded-lg object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServicePage;
