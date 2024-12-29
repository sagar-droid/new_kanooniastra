import Image from "next/image";
import React from "react";

const services = [
  {
    id: "foreign-direct-investment",
    title: "Foreign Direct Investment",
    description: [
      "Providing legal advice and assistance on foreign direct investment regulations and compliance",
    ],
    images: "/fdi.jpeg",
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    description: [
      "Advising on the protection of intellectual property rights (IPR)",
      "Handling registration and renewal of patents, designs, and trademarks",
      "Drafting and reviewing franchise agreements and technology transfer agreements (TTA)",
    ],
    images: "/intellectual-property.png",
  },
  {
    id: "family-law",
    title: "Family Law",
    description: [
      "Divorce proceedings and legal representation",
      "Marriage-related legal services",
      "Child custody matters",
      "Adoption procedures",
      "Property division in family disputes",
    ],
    images: "/family-law.png",
  },
  {
    id: "tmt-law",
    title: "TMT Law (Technology, Media, and Telecommunications)",
    description: [
      "Addressing legal issues related to technology, media, and telecommunications sectors",
    ],
    images: "/tmt-law.png",
  },
  {
    id: "property-law",
    title: "Property Law",
    description: [
      "Handling land deeds and property transactions",
      "Property partition services",
    ],
    images: "/property-law.jpg",
  },
  {
    id: "corporate-law",
    title: "Corporate Law",
    description: [
      "Ensuring company compliance with regulations",
      "Assisting with company incorporation",
      "Providing startup counseling",
      "Handling merger and acquisition transactions",
    ],
    images: "/corporate-law.png",
  },
  {
    id: "litigation",
    title: "Litigation",
    description: [
      "Representing clients in various courts, including labor courts, revenue tribunals, district courts, high courts, and the Supreme Court",
    ],
    images: "/litigation.png",
  },
  {
    id: "legality-maintenance-programs",
    title: "Legality Maintenance Programs",
    description: [
      "Formulating by-laws for companies",
      "Drafting rules and regulations for local government offices",
    ],
    images: "/legality-maintenance.png",
  },
  {
    id: "intellectual-property-investigation",
    title: "Intellectual Property Investigation",
    description: [
      "Conducting investigations related to intellectual property rights, including anti-counterfeiting, copyright infringement, patent infringement, unauthorized use of trademarks, product copying, brand imitation, parallel trade, and remedies for breaches",
    ],
    images: "/ipr.png",
  },
  {
    id: "criminal-law",
    title: "Criminal Law",
    description: [
      "Offering legal representation and advice in criminal law matters",
    ],
    images: "/criminal-law.png",
  },
  {
    id: "dispute-resolution",
    title: "Dispute Resolution",
    description: [
      "Managing labor and employment disputes",
      "Drafting contracts and policies to prevent disputes",
    ],
    images: "/fdi.jpeg",
  },
  {
    id: "ngo-ingo-services",
    title: "NGO/INGO Services",
    description: [
      "Assisting with registration and compliance for non-governmental organizations (NGOs) and international non-governmental organizations (INGOs)",
      "Handling visa and work permit issues",
      "Drafting and reviewing project proposals and agreements",
    ],
    images: "/fdi.jpeg",
  },
];

const OurServicesPage = () => {
  return (
    <div className=" min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center text-primary mb-12">
          Our Services
        </h1>
        <div className="space-y-12">
          {services.map((service: any) => (
            <section
              key={service.id}
              id={service.id}
              className="bg-white shadow-md flex gap-20 rounded-lg p-8">
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-blue-600 mb-4">
                  {service.title}
                </h2>
                <ul className="list-disc list-inside text-gray-700">
                  {service.description.map((desc: any, index: any) => (
                    <li key={index}>{desc}</li>
                  ))}
                </ul>
              </div>
              <div className=" ">
                <Image
                  src={service.images}
                  alt="service_images"
                  width={400}
                  height={400}
                />
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurServicesPage;
