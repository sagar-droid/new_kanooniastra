import React from "react";
import Link from "next/link";
import Button from "@/components/common/Button";
import { services as fallbackServices } from "../../../../data/services";
import { connectToDatabase } from "@/lib/mongodb";
import ServiceModel from "@/models/Service";
import {
  FiGlobe,
  FiShield,
  FiUsers,
  FiCpu,
  FiHome,
  FiBriefcase,
  FiAward,
  FiFileText,
  FiCheckCircle,
  FiArrowRight,
} from "react-icons/fi";

const getServiceIcon = (key: string) => {
  const normalized = key.toLowerCase();
  if (
    normalized.includes("fdi") ||
    normalized.includes("foreign") ||
    normalized.includes("investment")
  ) {
    return <FiGlobe />;
  }
  if (
    normalized.includes("intellectual") ||
    normalized.includes("ipr") ||
    normalized.includes("patent") ||
    normalized.includes("trademark")
  ) {
    return <FiShield />;
  }
  if (
    normalized.includes("family") ||
    normalized.includes("divorce") ||
    normalized.includes("custody") ||
    normalized.includes("marriage")
  ) {
    return <FiUsers />;
  }
  if (
    normalized.includes("tmt") ||
    normalized.includes("tech") ||
    normalized.includes("telecom") ||
    normalized.includes("media")
  ) {
    return <FiCpu />;
  }
  if (
    normalized.includes("property") ||
    normalized.includes("real estate") ||
    normalized.includes("land")
  ) {
    return <FiHome />;
  }
  if (
    normalized.includes("corporate") ||
    normalized.includes("commercial") ||
    normalized.includes("company") ||
    normalized.includes("business")
  ) {
    return <FiBriefcase />;
  }
  if (
    normalized.includes("criminal") ||
    normalized.includes("litigation") ||
    normalized.includes("court") ||
    normalized.includes("dispute")
  ) {
    return <FiAward />;
  }
  return <FiFileText />;
};

async function getPublishedServices() {
  try {
    await connectToDatabase();
    const dbServices = await ServiceModel.find({ status: "published" })
      .sort({ displayOrder: 1, createdAt: 1 })
      .limit(6)
      .lean();

    if (dbServices && dbServices.length > 0) {
      return dbServices.map((s) => ({
        id: s.slug,
        title: s.title,
        intro: s.intro,
        description: s.description || [],
      }));
    }
  } catch (error) {
    console.error("Failed to query ServiceModel, falling back to static services", error);
  }

  return fallbackServices.slice(0, 6).map((s) => ({
    id: s.id,
    title: s.title,
    intro: s.intro,
    description: s.description || [],
  }));
}

const OurServices = async () => {
  const servicesList = await getPublishedServices();

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50/70 to-gray-50 relative overflow-hidden w-full">
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-red-50/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <article className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center">
          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="100"
          >
            Our Legal Services
          </h2>
          <p
            className="mt-4 text-base sm:text-lg text-gray-600 leading-relaxed"
            data-aos="fade-up"
            data-aos-once="true"
            data-aos-delay="150"
          >
            Delivering strategic counsel, regulatory clarity, and steadfast advocacy across Nepal&apos;s legal and commercial landscape.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mt-12 sm:mt-16">
          {servicesList.map((service, index) => (
            <Link
              key={service.id}
              href={`/our-services/${service.id}`}
              className="group relative flex flex-col justify-between bg-white rounded-2xl border border-gray-200/80 p-6 sm:p-7 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300 hover:-translate-y-1.5 overflow-hidden"
              data-aos="fade-up"
              data-aos-once="true"
              data-aos-delay={index * 100}
            >
              {/* Top Accent Line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-red-500 to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              <div>
                {/* Top Badge & Number */}
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-red-50 text-primary flex items-center justify-center text-xl group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm shrink-0">
                    {getServiceIcon(`${service.id} ${service.title}`)}
                  </div>
                  <span className="text-xs font-mono font-semibold text-gray-300 group-hover:text-primary transition-colors">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-200 mt-5 mb-2.5">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5">
                  {service.intro}
                </p>

                {/* Key Highlights */}
                {service.description && service.description.length > 0 && (
                  <div className="pt-4 border-t border-gray-100 space-y-2 mb-4">
                    {service.description.slice(0, 2).map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-gray-600">
                        <FiCheckCircle className="text-primary mt-0.5 shrink-0 text-sm" />
                        <span className="line-clamp-1">{item}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Card Footer Link */}
              <div className="mt-auto pt-3 flex items-center justify-between text-xs font-semibold text-primary">
                <span>Explore practice area</span>
                <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-red-50 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <FiArrowRight className="text-sm transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Bottom CTA */}
        <div
          className="flex justify-center items-center mt-12 sm:mt-16"
          data-aos="fade-up"
          data-aos-once="true"
        >
          <Button title="View All Services" link="/our-services" />
        </div>
      </article>
    </section>
  );
};

export default OurServices;
