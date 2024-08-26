import Button from "@/components/common/Button";
import Link from "next/link";
import React from "react";

const services = [
  {
    title: "Family Law",
    items: [
      "Partition",
      "Divorce",
      "Marriage Registration",
      "Adoption",
      "Child Custody",
    ],
    link: "/our-services/family-law",
  },
  {
    title: "Property Law",
    items: ["Partition", "Registration of Property", "Transfer of Property"],
    link: "/our-services/property-law",
  },
  {
    title: "Corporate Law",
    items: [
      "Company Registration",
      "Company Compliances",
      "Industry Registration",
      "Small and Cottage Industry Registration",
    ],
    link: "/our-services/corporate-law",
  },
  {
    title: "Labour Law",
    items: ["Labour related issues"],
    link: "/our-services/labour-law",
  },
  {
    title: "Hotel Sector",
    items: [
      "Approval from Department of Tourism",
      "Policy Drafting for company",
      "Approval from different departments",
    ],
    link: "/our-services/hotel-sector",
  },
  {
    title: "Intellectual Property",
    items: [
      "Copyright Claim",
      "Trademark Registration",
      "IP case drafting and litigation",
      "Patent Registration",
    ],
    link: "/our-services/intellectual-property",
  },
  {
    title: "Banking Sector",
    items: ["Cheque Bounce", "Black Listing"],
    link: "/our-services/banking-sector",
  },
  {
    title: "Taxation Laws",
    items: [
      "Registration of VAT/PAN",
      "Tax assessment Cases",
      "Writ on Taxation issues",
    ],
    link: "/our-services/taxation-laws",
  },
  {
    title: "NGO/INGO Registration",
    items: [],
    link: "/our-services/ngo-ingo-registration",
  },
  {
    title: "Foreign Direct Investment",
    items: [
      "Registration",
      "Approval",
      "Liquidation",
      "Visa approvals",
      "Approval for Technology Transfer Agreement",
    ],
    link: "/our-services/foreign-direct-investment",
  },
  {
    title: "Dispute Resolution",
    items: [],
    link: "/our-services/dispute-resolution",
  },
  {
    title: "Litigation",
    items: [],
    link: "/our-services/litigation",
  },
  {
    title: "Criminal Law",
    items: [],
    link: "/our-services/criminal-law",
  },
];

const OurServices = () => {
  return (
    <section className="py-12 relative">
      {/* Clipped background */}
      <div
        className="absolute inset-0 bg-black z-0"
        style={{
          clipPath: "polygon(100% 0, 0% 100%, 100% 100%)",
        }}
      ></div>

      {/* Content */}
      <article className="container relative z-10">
        <h2
          className="text-5xl font-bold text-center text-gray-800 mb-8"
          data-aos="fade-up"
          data-aos-once="true"
        >
          Our Services
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {services.slice(0, 6).map((service, index) => (
            <Link
              key={index}
              href={service.link}
              className="block"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="bg-white rounded-lg w-[300px] shadow-md p-6 h-full transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
                <h3 className="text-xl font-semibold text-blue-600 mb-2">
                  {service.title}
                </h3>
                {service.items.length > 0 && (
                  <ul className="text-gray-600 text-sm list-disc list-inside">
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
          <Button title="View All" />
        </div>
      </article>
    </section>
  );
};

export default OurServices;
