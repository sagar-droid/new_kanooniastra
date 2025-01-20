import Button from "@/components/common/Button";
import Link from "next/link";
import React from "react";

const services = [
  {
    title: "Foreign Direct Investment",
    items: [
      "Providing legal advice and assistance on foreign direct investment regulations and compliance",
    ],
    link: "/our-services#foreign-direct-investment",
  },
  {
    title: "Intellectual Property",
    items: [
      "Advising on the protection of intellectual property rights (IPR)",
      "Handling registration and renewal of patents, designs, and trademarks",
      "Drafting and reviewing franchise agreements and technology transfer agreements (TTA)",
    ],
    link: "/our-services#intellectual-property",
  },

  {
    title: "Family Law",
    items: [
      "Divorce proceedings and legal representation",
      "Marriage-related legal services",
      "Child custody matters",
      "Adoption procedures",
      "Property division in family disputes",
    ],
    link: "/our-services#family-law",
  },
  {
    title: "TMT Law (Technology, Media, and Telecommunications)",
    items: [
      "Addressing legal issues related to technology, media, and telecommunications sectors",
    ],
    link: "/our-services#tmt-law",
  },
  {
    title: "Property Law",
    items: [
      "Handling land deeds and property transactions",
      "Property partition services",
    ],
    link: "/our-services#property-law",
  },
  {
    title: "Corporate Law",
    items: [
      "Ensuring company compliance with regulations",
      "Assisting with company incorporation",
      "Providing startup counseling",
      "Handling merger and acquisition transactions",
    ],
    link: "/our-services#corporate-law",
  },
  {
    title: "Litigation",
    items: [
      "Representing clients in various courts, including labor courts, revenue tribunals, district courts, high courts, and the Supreme Court",
    ],
    link: "/our-services#litigation",
  },
  {
    title: "Legality Maintenance Programs",
    items: [
      "Formulating by-laws for companies",
      "Drafting rules and regulations for local government offices",
    ],
    link: "/our-services#legality-maintenance-programs",
  },
  {
    title: "Intellectual Property Investigation",
    items: [
      "Conducting investigations related to intellectual property rights, including anti-counterfeiting, copyright infringement, patent infringement, unauthorized use of trademarks, product copying, brand imitation, parallel trade, and remedies for breaches",
    ],
    link: "/our-services#intellectual-property-investigation",
  },
  {
    title: "Criminal Law",
    items: ["Offering legal representation and advice in criminal law matters"],
    link: "/our-services#criminal-law",
  },
  {
    title: "Dispute Resolution",
    items: [
      "Managing labor and employment disputes",
      "Drafting contracts and policies to prevent disputes",
    ],
    link: "/our-services#dispute-resolution",
  },
  {
    title: "NGO/INGO Services",
    items: [
      "Assisting with registration and compliance for non-governmental organizations (NGOs) and international non-governmental organizations (INGOs)",
      "Handling visa and work permit issues",
      "Drafting and reviewing project proposals and agreements",
    ],
    link: "/our-services#ngo-ingo-services",
  },
];

const OurServices = () => {
  return (
    <section className="py-12 relative overflow-x-hidden w-full">
      {/* Clipped background */}
      <div
        className="absolute inset-0 bg-black z-0 w-full"
        style={{
          clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
        }}></div>

      {/* Content */}
      <article className="container relative z-10 mx-auto px-4">
        <h2
          className="text-5xl font-bold text-center text-gray-800 mb-8"
          data-aos="fade-up"
          data-aos-once="true">
          Our Services
        </h2>
        <div className="flex flex-wrap justify-center gap-6 w-full">
          {services.slice(0, 6).map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="block w-full sm:w-auto"
              data-aos="fade-up"
              data-aos-delay={index * 100}>
              <div className="bg-white group rounded-lg w-full sm:w-[300px] shadow-md p-6 h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-2xl font-semibold text-gray-800 mb-3 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>
                {service.items.length > 0 && (
                  <ul className="text-gray-600 text-lg list-disc list-outside ml-4">
                    {service.items.slice(0, 3).map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                    {service.items.length > 3 && <li>...</li>}
                  </ul>
                )}
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center items-center mt-8">
          <Button title="View All" link="/our-services" />
        </div>
      </article>
    </section>
  );
};

export default OurServices;
