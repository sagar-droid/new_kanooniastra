import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  FiArrowLeft,
  FiArrowRight,
  FiCheckCircle,
  FiPhone,
  FiMail,
  FiMapPin,
  FiShield,
  FiBriefcase,
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
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
    title: `${service.title} Services in Nepal — Kanooni Astra`,
    description: service.intro,
    alternates: { canonical: `/our-services/${service.id}` },
    openGraph: {
      title: `${service.title} Services in Nepal — Kanooni Astra`,
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

  const relatedServices = services
    .filter((s) => s.id !== service.id)
    .slice(0, 3);

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
        name: "Home",
        item: "https://kanooniastra.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Our Services",
        item: "https://kanooniastra.com/our-services",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: service.title,
        item: `https://kanooniastra.com/our-services/${service.id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-gray-50/60 py-10 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <div className="container">
        {/* Navigation & Breadcrumb */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm text-gray-500 font-medium flex-wrap">
              <li>
                <Link href="/" className="hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li>
                <Link
                  href="/our-services"
                  className="hover:text-primary transition-colors">
                  Our Services
                </Link>
              </li>
              <li>/</li>
              <li className="text-gray-900 font-semibold">{service.title}</li>
            </ol>
          </nav>

          <Link
            href="/our-services"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-primary transition-colors group">
            <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
            <span>All Services</span>
          </Link>
        </div>

        {/* Hero Section */}
        <header className="max-w-4xl mb-10 md:mb-14">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight mb-5">
            {service.title}{" "}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
            {service.intro}
          </p>
        </header>

        {/* 2-Column Responsive Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-10 items-start">
          {/* Main Column (8 Cols) */}
          <div className="lg:col-span-8 flex flex-col gap-8">
            {/* Scope of Practice Card */}
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/90">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                  <FiBriefcase />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Scope of Legal Services
                  </h2>
                  <p className="text-sm text-gray-500">
                    Key areas of legal counsel, representation, and regulatory assistance
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-3.5">
                {service.description.map((desc, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-3.5 p-4 rounded-xl bg-gray-50/70 border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors">
                    <FiCheckCircle className="text-primary text-xl flex-shrink-0 mt-0.5" />
                    <p className="text-gray-800 text-base md:text-lg leading-relaxed font-medium">
                      {desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Why Kanooni Astra Card */}
            <section className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/90">
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl">
                  <FiShield />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    Our Legal Practice Standards
                  </h2>
                  <p className="text-sm text-gray-500">
                    How Kanooni Astra delivers structured counsel in Nepal
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-1.5">
                    Regulatory Depth
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Direct liaison with ministries, OCR, DOI, Land Revenue (Malpot), and tribunals for seamless compliance.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-1.5">
                    Court Representation
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Experienced litigation advocacy across District Courts, High Courts, and the Supreme Court of Nepal.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-gray-50/70 border border-gray-100">
                  <h3 className="font-bold text-gray-900 text-base mb-1.5">
                    Transparent Retainers
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Upfront clarity on fees, transparent engagement terms, and predictable milestone-driven delivery.
                  </p>
                </div>
              </div>
            </section>

            {/* Related Services */}
            {relatedServices.length > 0 && (
              <section className="flex flex-col gap-4">
                <div className="flex items-center justify-between px-1">
                  <h2 className="text-xl font-bold text-gray-900">
                    Other Legal Practice Areas
                  </h2>
                  <Link
                    href="/our-services"
                    className="text-sm font-semibold text-primary hover:underline">
                    View all &rarr;
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {relatedServices.map((related) => (
                    <Link
                      key={related.id}
                      href={`/our-services/${related.id}`}
                      className="group bg-white p-5 rounded-2xl border border-gray-200/90 shadow-sm hover:border-primary/40 hover:shadow-md transition-all flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                          {related.title}
                        </h3>
                        <p className="text-xs text-gray-600 line-clamp-3 leading-relaxed mb-4">
                          {related.intro}
                        </p>
                      </div>
                      <span className="text-xs font-semibold text-primary flex items-center gap-1">
                        Learn more <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column (4 Cols) */}
          <aside className="lg:col-span-4 lg:sticky lg:top-24 flex flex-col gap-6">
            {/* Service Visual Card */}
            <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-200/90 flex flex-col items-center">
              <div className="w-full relative aspect-[16/10] bg-gray-50 rounded-xl overflow-hidden flex items-center justify-center p-3 border border-gray-100">
                <Image
                  src={service.images}
                  alt={`${service.title} services at Kanooni Astra`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 350px"
                  className="object-contain p-2"
                  priority
                />
              </div>
            </div>

            {/* Direct Consultation Card */}
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-sm border border-gray-200/90 flex flex-col gap-6">
              <div className="flex flex-col gap-2 border-b border-gray-100 pb-5">
                <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-xl mb-1">
                  <FiBriefcase />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  Inquire About This Service
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Need customized legal counsel for {service.title}? Speak directly with our advocates in Kathmandu.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                <Link
                  href={`/contactus?service=${encodeURIComponent(service.title)}`}
                  className="w-full text-center py-3.5 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-base transition-all duration-200 shadow-sm hover:shadow flex items-center justify-center gap-2 group">
                  <span>Get in Touch with Our Team</span>
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </Link>

                <a
                  href={`https://wa.me/9867350369?text=${encodeURIComponent(
                    `Hello Kanooni Astra, I would like to consult with your team regarding ${service.title} services in Nepal.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center py-3.5 px-6 rounded-xl bg-transparent hover:bg-emerald-50 text-emerald-600 hover:text-emerald-700 border border-emerald-600 font-semibold text-base transition-all duration-200 flex items-center justify-center gap-2">
                  <FaWhatsapp className="text-xl" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>

              {/* Direct Contacts */}
              <div className="flex flex-col gap-3.5 text-sm pt-2 border-t border-gray-100">
                <div className="flex items-start gap-3">
                  <FiPhone className="text-primary text-base mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Phone</p>
                    <div className="flex flex-col text-gray-600">
                      <a href="tel:+9779843671048" className="hover:text-primary transition-colors">
                        +977 9843671048
                      </a>
                      <a href="tel:+9779844393183" className="hover:text-primary transition-colors">
                        +977 9844393183
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMail className="text-primary text-base mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Email</p>
                    <a
                      href="mailto:kanooniastra@gmail.com"
                      className="text-gray-600 hover:text-primary transition-colors">
                      kanooniastra@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <FiMapPin className="text-primary text-base mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-gray-800 text-xs uppercase tracking-wider">Office</p>
                    <p className="text-gray-600">Ghattekulo marg, Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
};

export default ServicePage;
