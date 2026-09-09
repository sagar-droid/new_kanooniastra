import React from "react";
import Button from "@/components/common/Button";
import { connectToDatabase } from "@/lib/mongodb";
import FAQModel from "@/models/FAQ";
import FAQAccordion, { type FAQItem } from "./FAQAccordion";

const DEFAULT_FAQS: FAQItem[] = [
  {
    id: "fdi-nepal",
    question: "What is the process and minimum investment required for Foreign Direct Investment (FDI) in Nepal?",
    answer:
      "Under Nepal's Foreign Investment and Technology Transfer Act (FITTA), the minimum foreign investment threshold is NPR 20 million per foreign investor. The process requires prior approval from the Department of Industries (DOI) or the Investment Board of Nepal (IBN), company incorporation at the Office of the Company Registrar, industry registration, and capital bring-in approval from Nepal Rastra Bank.",
  },
  {
    id: "company-registration",
    question: "How do I register a private or public company in Nepal?",
    answer:
      "Company registration in Nepal is processed through the Office of the Company Registrar (OCR). Steps involve online company name reservation, drafting the Memorandum of Association (MOA) and Articles of Association (AOA), submitting registration documentation, obtaining the certificate of incorporation, acquiring a PAN/VAT certificate from the Inland Revenue Department, and registering with the local ward office.",
  },
  {
    id: "trademark-ip-protection",
    question: "How are trademarks and intellectual property rights registered and protected in Nepal?",
    answer:
      "Trademarks, patents, and industrial designs are registered through the Department of Industries (DOI) under the Patent, Design and Trademark Act. Nepal operates primarily on a first-to-file basis. Our advocates handle trademark clearance searches, filing applications, responding to examiner objections, monitoring trademark gazettes, and enforcing anti-counterfeiting remedies against unauthorized use.",
  },
  {
    id: "court-system-litigation",
    question: "What types of courts and tribunals handle commercial and civil disputes in Nepal?",
    answer:
      "Nepal's judicial hierarchy comprises District Courts, High Courts across seven provinces, and the Supreme Court of Nepal. Specialized legal bodies include the Labor Court, Debt Recovery Tribunal, and Revenue Tribunal. Kanooni Astra advocates represent clients across all court tiers as well as in mediation and domestic arbitration proceedings.",
  },
  {
    id: "consultation-booking",
    question: "How can I schedule a consultation with an advocate at Kanooni Astra?",
    answer:
      "You can book a consultation directly through the 'Appointment' button on our website, call our Kathmandu office at +977-9843671048 or +977-9844393183, or email kanooniastra@gmail.com. We offer both in-person meetings at our Ghattekulo office in Kathmandu and virtual consultations for clients located outside Kathmandu or overseas.",
  },
];

const FAQSection = async () => {
  let faqs: FAQItem[] = [];

  try {
    await connectToDatabase();
    const dbFaqs = await FAQModel.find({ status: "published" })
      .sort({ displayOrder: 1 })
      .limit(6)
      .lean();

    if (dbFaqs && dbFaqs.length > 0) {
      faqs = dbFaqs.map((faq) => ({
        id: String(faq._id),
        question: faq.question,
        answer: faq.answer,
      }));
    }
  } catch {
    // If DB is unreachable during static generation, fall back to curated defaults
  }

  if (faqs.length === 0) {
    faqs = DEFAULT_FAQS;
  }

  return (
    <section className="bg-gray-50 py-24">
      <article className="container">
        <div className="mb-12">
          <h2
            className="flex flex-col gap-2 text-5xl border-primary border-l-4 pl-4"
            data-aos="fade-right" data-aos-once="true">
            Frequently Asked Questions
            <span className="text-lg text-gray-600">
              Clear answers to common legal and regulatory inquiries in Nepal
            </span>
          </h2>
        </div>

        <div className="max-w-4xl" data-aos="fade-up" data-aos-once="true">
          <FAQAccordion items={faqs} />
        </div>

        <div className="mt-12" data-aos="fade-up" data-aos-once="true">
          <Button title="View All FAQs" link="/faq" />
        </div>
      </article>
    </section>
  );
};

export default FAQSection;
